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
exports.deleteAllBooks = exports.deleteBook = exports.updateBook = exports.getBookById = exports.getAllBooks = exports.createBook = void 0;
const book_1 = __importDefault(require("../models/book"));
const bookValidators_1 = require("../validators/bookValidators");
const console_1 = require("console");
// Create a new book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, genre, price, pageCount, description, image } = bookValidators_1.bookSchema.parse(req.body);
        const newBook = new book_1.default({
            title,
            author,
            genre,
            price,
            pageCount,
            description,
            image
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
});
exports.createBook = createBook;
// Get all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.default.find();
        (0, console_1.log)(books);
        res.status(200).json(books);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getAllBooks = getAllBooks;
// Get a book by ID
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_1.default.findById(req.params.id);
        if (book) {
            res.status(200).json(book);
        }
        else {
            res.status(404).json({ message: "Book not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.getBookById = getBookById;
// Update a book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield book_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (updatedBook) {
            res.status(200).json(updatedBook);
        }
        else {
            res.status(404).json({ message: "Book not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.updateBook = updateBook;
// Delete a book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.deleteBook = deleteBook;
// Delete all books
const deleteAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBooks = yield book_1.default.deleteMany();
        if (deletedBooks) {
            res.status(200).json({ message: "All books deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Books not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.deleteAllBooks = deleteAllBooks;
