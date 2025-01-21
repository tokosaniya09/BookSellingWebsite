"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const zod_1 = require("zod");
exports.bookSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title cannot exceed 100 characters"),
    author: zod_1.z.string().min(1, "Author name is required"),
    genre: zod_1.z.string().min(1, "Genre is required"),
    price: zod_1.z
        .number()
        .min(0, "Price must be a positive value"),
    pageCount: zod_1.z
        .number()
        .min(1, "Page count must be at least 1"),
    description: zod_1.z
        .string()
        .min(10, "Description must be at least 10 characters long"),
    image: zod_1.z
        .string()
        .url("Invalid image URL format"),
});
