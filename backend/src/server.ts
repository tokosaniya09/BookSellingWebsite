import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}


mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Book Selling API');
});

app.use('/api/books', bookRoutes);
app.use('/api/user', userRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
