import { z } from "zod";

export const bookSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title cannot exceed 100 characters"),
    author: z.string().min(1, "Author name is required"),
    genre: z.string().min(1, "Genre is required"),
    price: z
        .number()
        .min(0, "Price must be a positive value"),
    pageCount: z
        .number()
        .min(1, "Page count must be at least 1"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters long"),
    image: z
        .string()
        .url("Invalid image URL format"),
});
