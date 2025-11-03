import type { NextApiRequest, NextApiResponse } from 'next';
import connectDb from '../../../lib/db';
import User from '../../../models/User';
import CvAnalysis from '../../../models/CvAnalysis';
import Feedback from '../../../models/Feedback';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  await connectDb();
  try {
    const totalUsers = await User.countDocuments();
    const feedbackCount = await Feedback.countDocuments();
    const avgCvScoreAgg = await CvAnalysis.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$score' } } },
    ]);
    const avgFeedbackRatingAgg = await Feedback.aggregate([
        { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);

    const averageCvScore = avgCvScoreAgg.length > 0 ? avgCvScoreAgg[0].avgScore : 0;
    const averageFeedbackRating = avgFeedbackRatingAgg.length > 0 ? avgFeedbackRatingAgg[0].avgRating : 0;

    res.status(200).json({
      totalUsers,
      feedbackCount,
      averageCvScore: averageCvScore.toFixed(2),
      averageFeedbackRating: averageFeedbackRating.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
