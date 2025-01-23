import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, email, password, image, role } = req.body;

        const availableImages = [
            'C:/Users/tokos/Desktop/webdev/book-selling-website/frontend/public/images/avatar_girl.jpg',
            'C:/Users/tokos/Desktop/webdev/book-selling-website/frontend/public/images/avatar_girl.jpg'        
        ];

        const userImage = image || availableImages[Math.floor(Math.random() * availableImages.length)];

        const user = new User ({
            name, 
            email, 
            password, 
            image: userImage, 
            role
        });

        const savedUser = await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: savedUser._id, 
                name: savedUser.name,
                email: savedUser.email,
                image: savedUser.image,
            },
        });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    };
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email});

        if (!user) {
            return res.status(400).json({ meassage: 'Invalid credentials' });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign (
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '30d' }
        );

        res.status(200).json ({
            message: 'Login Successful', 
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
});

router.get('/profile', async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
            id: string;
            role: string;
        } 

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: "User not found"});
        }

        res.status(200.json) ({
            message: 'Profile retrieved successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role
            },
        });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message});
    }
});

export default router;