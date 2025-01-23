import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image?: string;
    role: string;
    cart: string[];
    wishlist: string[];
    orders: string[];
    comparePassword(candidatePassword: string): Promise<boolean>; 
}

const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [3, 'Name must be at least 3 characters long'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        image: {
            type: String,
            default: 'C:/Users/tokos/Desktop/webdev/book-selling-website/frontend/public/images/avatar_girl.jpg', 
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        cart: {
            type: [String],
            default: [],
        },
        wishlist: {
            type: [String],
            default: [],
        },
        orders: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true, 
    }
);

UserSchema.pre('save', async function (next) {
    const user = this as unknown as IUser;

    if (!user.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
