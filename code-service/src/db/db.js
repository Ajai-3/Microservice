import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Try Docker MongoDB first, then fallback to localhost
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/code';
    console.log('🔗 Connecting to MongoDB:', mongoUri);

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Database connection error:', error.message);

    // Try localhost as fallback
    if (process.env.MONGO_URI && process.env.MONGO_URI.includes('mongo:')) {
      console.log('🔄 Trying localhost MongoDB...');
      try {
        const fallbackUri = 'mongodb://localhost:27017/code';
        const conn = await mongoose.connect(fallbackUri);
        console.log(`✅ MongoDB Connected (localhost): ${conn.connection.host}`);
        return;
      } catch (fallbackError) {
        console.error('❌ Localhost MongoDB also failed:', fallbackError.message);
      }
    }

    console.error('💡 Make sure MongoDB is running on port 27017');
    process.exit(1);
  }
};

export default connectDB;
