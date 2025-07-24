import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import databaseRouter from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

app.use('/api/database', databaseRouter);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});