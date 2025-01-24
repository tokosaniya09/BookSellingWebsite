import express from "express";

import {
    registerUser,
    loginUser,
    getUserProfile,
    deleteUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);
router.delete("/delete/:id", deleteUser);

export default router;
