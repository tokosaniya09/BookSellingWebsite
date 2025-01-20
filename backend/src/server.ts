import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes';

dotenv.config();

const app = express();


// Middleware
app.use(express.json());
app.use(cors());


// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}


mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Failed:', err));

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Book Selling API');
});

// API Routes
app.use('/api', bookRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
