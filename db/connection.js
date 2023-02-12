import mongoose from 'mongoose';
import 'dotenv/config';

const { DB_URI } = process.env;

mongoose.set('strictQuery', false);

//Connecting to MongoDB server
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
