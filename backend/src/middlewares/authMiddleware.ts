import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
            id: string;
            role: string;
        };

        req.user = decoded; 
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized access' });
    }
};

export default authMiddleware;
