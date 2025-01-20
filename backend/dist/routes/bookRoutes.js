"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const express_1 = __importDefault(require("express"));
const book_1 = __importDefault(require("../models/book"));
const router = express_1.default.Router();
//Create a new book
router.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, price, pageCount, description } = req.body;
        (0, console_1.log)(req.body);
        const newBook = new book_1.default({
            title,
            author,
            genre,
            price,
            pageCount,
            description
        });
        const savedBook = yield newBook.save();
        if (savedBook) {
            res.status(201).json(savedBook);
        }
        else {
            res.status(400).json({ message: "Book not saved" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get all books
router.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.find();
        (0, console_1.log)(books);
        res.status(200).json(books);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Get a book by id
router.get('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        }
        else {
            res.status(404).json({ message: 'Book not found' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Update a book
router.put('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield book_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedBook) {
            res.status(200).json(updatedBook);
        }
        else {
            res.status(404).json({ mesaage: "Book not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
// Delete a book
router.delete('/books/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield book_1.default.findByIdAndDelete(req.params.id);
        if (deletedBook) {
            res.status(200).json({ message: "Book deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Book not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
