"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controllers/bookController");
const router = express_1.default.Router();
router.post("/createBook", bookController_1.createBook);
router.get("/getAllBooks", bookController_1.getAllBooks);
router.get("/getBookById/:id", bookController_1.getBookById);
router.put("/updateBook/:id", bookController_1.updateBook);
router.delete("/deleteBook/:id", bookController_1.deleteBook);
router.delete("/deleteAllBooks", bookController_1.deleteAllBooks);
exports.default = router;
