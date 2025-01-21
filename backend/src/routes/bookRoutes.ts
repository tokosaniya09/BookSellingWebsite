// backend/routes/bookRoutes.ts
import express from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  deleteAllBooks,
} from "../controllers/bookController";

const router = express.Router();

router.post("/books", createBook);
router.get("/books", getAllBooks);
router.get("/books/:id", getBookById);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);
router.delete("/books/", deleteAllBooks);

export default router;
