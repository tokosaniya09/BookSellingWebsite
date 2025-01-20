import { log } from 'console';
import express, {Request, Response} from 'express';
import Book from '../models/book';

const router = express.Router();

//Create a new book
router.post('/books', async (req: Request, res: Response) => {
    try {
        const { title, author, genre, price, pageCount, description} = req.body;

        log(req.body);

        const newBook = new Book({
            title, 
            author,
            genre,
            price, 
            pageCount,
            description
        });

        const savedBook = await newBook.save();
        if (savedBook) {
            res.status(201).json(savedBook);
        } else {
            res.status(400).json({message: "Book not saved"});
        }
    } catch (err) {
        res.status(500).json({message: (err as Error).message});
    }
})

// Get all books
router.get('/books', async(req: Request, res: Response) => {
    try {
        const books = await Book.find();
        log(books);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({message: (err as Error).message});
    }
})

// Get a book by id
router.get('/books/:id', async(req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message: 'Book not found'});
        }
    } catch (err) {
        res.status(500).json({message: (err as Error).message});
    }
})

// Update a book
router.put('/books/:id', async(req: Request, res: Response) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true});
        if (updatedBook) {
            res.status(200).json(updatedBook);
        } else {
            res.status(404).json({mesaage: "Book not found"});
        }
    } catch (err) {
        res.status(500).json({message: (err as Error).message});
    }
})

// Delete a book
router.delete('/books/:id', async(req: Request, res: Response) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (deletedBook) {
            res.status(200).json({message: "Book deleted successfully"});
        } else {
            res.status(404).json({message: "Book not found"});
        }
    } catch (err) {
        res.status(500).json({message: (err as Error).message});
    }
})

export default router;