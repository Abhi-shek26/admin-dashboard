import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import User from '../models/User';
import CvAnalysis from '../models/CvAnalysis';
import Feedback from '../models/Feedback';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await CvAnalysis.deleteMany({});
    await Feedback.deleteMany({});
    console.log('Cleared existing data.');

    // Mock data arrays
    const countries = ['India', 'USA', 'UK', 'Canada', 'Australia', 'Germany'];
    const careerStages = ['Fresher', 'Graduate', 'Experienced'];
    const satisfactions = ['Happy', 'Neutral', 'Unhappy'];

    const users = [];
    for (let i = 0; i < 200; i++) {
      users.push({
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        country: countries[Math.floor(Math.random() * countries.length)],
        careerStage: careerStages[Math.floor(Math.random() * careerStages.length)],
        isPaid: Math.random() > 0.7,
      });
    }
    const createdUsers = await User.insertMany(users);
    console.log('Seeded 200 users.');

    const cvAnalyses = [];
    for (const user of createdUsers) {
      const analysesCount = Math.floor(Math.random() * 5);
      for (let i = 0; i < analysesCount; i++) {
        cvAnalyses.push({
          userId: user._id,
          score: Math.floor(Math.random() * 51) + 50,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        });
      }
    }
    await CvAnalysis.insertMany(cvAnalyses);
    console.log('Seeded CV analyses.');

    const feedbacks = [];
    for (const user of createdUsers) {
      if (Math.random() > 0.5) {
        feedbacks.push({
          userId: user._id,
          rating: Math.floor(Math.random() * 5) + 1,
          satisfaction: satisfactions[Math.floor(Math.random() * satisfactions.length)],
        });
      }
    }
    await Feedback.insertMany(feedbacks);
    console.log('Seeded feedbacks.');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

seedDatabase();
