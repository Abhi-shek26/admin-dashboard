import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../../lib/db';
import Feedback from '../../../models/Feedback';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await connectDb();
  try {
    const feedbackByRating = await Feedback.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: { $concat: ['Rating ', { $toString: '$_id' }] }, 
          value: '$count',
          _id: 0,
        },
      },
      { $sort: { name: 1 } }, 
    ]);
    res.status(200).json(feedbackByRating);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
