import { Request, Response } from "express";
import Book from "../models/book";
import { bookSchema } from "../validators/bookValidators";
import { log } from "console";

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, price, pageCount, description, image } = bookSchema.parse(req.body);

    const newBook = new Book({
      title,
      author,
      genre,
      price,
      pageCount,
      description,
      image
    });

    const savedBook = await newBook.save();
    if (savedBook) {
      res.status(201).json(savedBook);
    } else {
      res.status(400).json({ message: "Book not saved" });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Get all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    log(books);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Update a book
export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedBook) {
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Delete a book
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (deletedBook) {
            res.status(200).json({ message: "Book deleted successfully" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};


// Delete all books
export const deleteAllBooks = async (req: Request, res: Response) => {
    try {
        const deletedBooks = await Book.deleteMany();
        if (deletedBooks) {
            res.status(200).json({ message: "All books deleted successfully" });
        } else {
            res.status(404).json({ message: "Books not found" });
        }
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};