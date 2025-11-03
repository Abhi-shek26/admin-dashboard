import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../../lib/db';
import CvAnalysis from '../../../models/CvAnalysis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();
  try {
    const topUsers = await CvAnalysis.aggregate([
      {
        $group: {
          _id: '$userId',
          averageScore: { $avg: '$score' },
          analysisCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails', 
      },
      {
        $project: {
          _id: 0,
          name: '$userDetails.name',
          email: '$userDetails.email',
          averageScore: { $round: ['$averageScore', 2] }, 
          analysisCount: '$analysisCount',
        },
      },
      {
        $sort: { averageScore: -1 },
      },
      {
        $limit: 5, 
      },
    ]);
    res.status(200).json(topUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
