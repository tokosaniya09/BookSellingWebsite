"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/routes/bookRoutes.ts
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const router = express_1.default.Router();
router.post("/books", bookController_1.createBook);
router.get("/books", bookController_1.getAllBooks);
router.get("/books/:id", bookController_1.getBookById);
router.put("/books/:id", bookController_1.updateBook);
router.delete("/books/:id", bookController_1.deleteBook);
router.delete("/books/", bookController_1.deleteAllBooks);
exports.default = router;
