import express from 'express';
import cors from 'cors';
import candidate from './routes/candidate.js';
import user from './routes/user.js';
import vote from './routes/vote.js';
import 'dotenv/config';

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/candidate', candidate);

app.use('/user', user);

app.use('/vote', vote);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
