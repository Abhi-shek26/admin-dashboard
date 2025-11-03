import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDb();
  try {
    const data = await User.aggregate([
      { $group: { _id: '$careerStage', count: { $sum: 1 } } },
      { $project: { name: '$_id', value: '$count', _id: 0 } },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
