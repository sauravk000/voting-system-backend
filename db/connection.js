import mongoose from 'mongoose';
import 'dotenv/config';

const { DB_URI } = process.env;

mongoose.set('strictQuery', false);

//Connecting to MongoDB server
export const connectDB = async function () {
  try {
    const conn = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};

//Various events
mongoose.connection
  .on('open', () => {
    console.log('Database opened');
  })
  .on('close', () => {
    console.log('Database closed');
  })
  .on('error', () => {
    console.error('Database error');
  });

export default mongoose;
