import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cookieParser());

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token; 
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string; role: string };
        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

app.get('/profile', authenticateUser, (req: Request, res: Response) => {
    res.status(200).json({ message: 'Access granted', user: req.user });
});
