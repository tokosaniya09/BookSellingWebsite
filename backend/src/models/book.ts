import mongoose, { Schema } from "mongoose";

interface IBook  extends Document {
    title: string;
    author: string;
    genre: string;
    price: number;
    pageCount: number;
    description: string;
}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, required: true },
        price: { type: Number, required: true },
        pageCount: { type: Number, required: true },
        description: { type: String, required: true }
    },{
        timestamps: true,
    }
);

const Book = mongoose.model<IBook>("Book", BookSchema);

export default Book;