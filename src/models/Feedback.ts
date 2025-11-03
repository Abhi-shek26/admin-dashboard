import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  rating: number;
  satisfaction: 'Happy' | 'Neutral' | 'Unhappy';
  createdAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  satisfaction: {
    type: String,
    enum: ['Happy', 'Neutral', 'Unhappy'],
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
