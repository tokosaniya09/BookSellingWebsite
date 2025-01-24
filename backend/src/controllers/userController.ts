import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, image, role } = req.body;

        const availableImages = [
            "C:/Users/tokos/Desktop/webdev/book-selling-website/frontend/public/images/avatar_girl.jpg",
            "C:/Users/tokos/Desktop/webdev/book-selling-website/frontend/public/images/avatar_boy.jpg",
        ];

        const userImage = image || availableImages[Math.floor(Math.random() * availableImages.length)];

        const newUser = new User({
            name,
            email,
            password,
            image: userImage,
            role,
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                image: savedUser.image,
            },
        });
    } catch (err) {
        res.status(400).json({ message: (err as Error).message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "30d" }
        );

        return res.status(200).json({
            message: "Login successful",
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
        return res.status(400).json({ message: (err as Error).message });
    }
};


export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
            id: string;
            role: string;
        };

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Profile retrieved successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                role: user.role,
            },
        });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (deletedUser) {
            res.status(200).json({ message: "User account deleted successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
