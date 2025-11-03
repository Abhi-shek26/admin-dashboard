import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../../lib/db';
import CvAnalysis from '../../../models/CvAnalysis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();
  try {
    const data = await CvAnalysis.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          date: '$_id',
          count: '$count',
          _id: 0,
        },
      },
      { $sort: { date: 1 } }, 
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
