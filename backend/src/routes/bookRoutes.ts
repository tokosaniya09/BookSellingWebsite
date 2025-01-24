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

router.post("/createBook", createBook);
router.get("/getAllBooks", getAllBooks);
router.get("/getBookById/:id", getBookById);
router.put("/updateBook/:id", updateBook);
router.delete("/deleteBook/:id", deleteBook);
router.delete("/deleteAllBooks", deleteAllBooks);

export default router;
