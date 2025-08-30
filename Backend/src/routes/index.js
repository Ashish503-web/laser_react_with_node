import express from "express";
import { verifyToken } from "../authMiddleware/authMiddleware.js";
import { register, login } from "../controllers/auth.js"
import { getUsersLIst } from "../controllers/Users.js";
import {
     addCategory, getCategoryList, deleteCategories,
     getCategoryRecord, updateCategories
} from "../controllers/Category.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", verifyToken, getUsersLIst);
router.get("/categories", verifyToken, getCategoryList);
router.post("/category", verifyToken, addCategory);
router.get("/category/:id", verifyToken, getCategoryRecord);
router.put("/category/:id", verifyToken, updateCategories);
router.delete("/category/{id}", verifyToken, deleteCategories);


export default router;