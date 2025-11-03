import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  country: string;
  careerStage: 'Fresher' | 'Graduate' | 'Experienced';
  isPaid: boolean;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  careerStage: {
    type: String,
    enum: ['Fresher', 'Graduate', 'Experienced'],
    required: true,
  },
  isPaid: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
