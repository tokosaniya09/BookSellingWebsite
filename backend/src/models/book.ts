import mongoose, { Schema, Document } from "mongoose";

interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    price: number;
    pageCount: number;
    description: string;
    image: string; 
    addedDate: Date; 
}

const BookSchema: Schema = new Schema(
    {
        title: { 
            type: String, 
            required: [true, "Title is required"], 
            unique: true, 
            minlength: [3, "Title must be at least 3 characters long"], 
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        author: { 
            type: String, 
            required: [true, "Author is required"] 
        },
        genre: { 
            type: String, 
            required: [true, "Genre is required"] 
        },
        price: { 
            type: Number, 
            required: [true, "Price is required"], 
            min: [0, "Price must be a positive value"] 
        },
        pageCount: { 
            type: Number, 
            required: [true, "Page count is required"], 
            min: [1, "Page count must be at least 1"] 
        },
        description: { 
            type: String, 
            required: [true, "Description is required"], 
            minlength: [10, "Description must be at least 10 characters long"] 
        },
        image: { 
            type: String, 
            required: [true, "Image URL is required"], 
            validate: {
                validator: (v: string) =>
                    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/.test(v),
                message: "Invalid image URL format",
            },
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model<IBook>("Book", BookSchema);

export default Book;
