import mongoose, { Schema, Document } from 'mongoose';

export interface ICvAnalysis extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  score: number;
  createdAt: Date;
}

const CvAnalysisSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, required: true, min: 0, max: 100 },
}, { timestamps: true });

export default mongoose.models.CvAnalysis || mongoose.model<ICvAnalysis>('CvAnalysis', CvAnalysisSchema);
