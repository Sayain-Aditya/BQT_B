const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/invoice-app';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Drop the old non-sparse unique index on quotationNumber if it exists,
    // so null values no longer cause E11000 duplicate key errors.
    try {
      await conn.connection.collection('proformainvoices').dropIndex('quotationNumber_1');
      console.log('Dropped old quotationNumber_1 index');
    } catch (_) {
      // Index didn't exist or already dropped — safe to ignore
    }
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
