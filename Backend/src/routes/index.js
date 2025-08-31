import express from "express";
import { verifyToken } from "../authMiddleware/authMiddleware.js";
import { register, login } from "../controllers/auth.js"
import { getUsersLIst } from "../controllers/Users.js";
import {
     addCategory, getCategoryList, deleteCategories,
     getCategoryRecord, updateCategories
} from "../controllers/Category.js";
import {
     createStock, deleteRecord, getByID,
     getCategoriesList, getStockList, updateStocks
} from "../controllers/stock.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", verifyToken, getUsersLIst);

router.get("/categories", verifyToken, getCategoryList);
router.post("/category", verifyToken, addCategory);
router.get("/category/:id", verifyToken, getCategoryRecord);
router.put("/category/:id", verifyToken, updateCategories);
router.delete("/category/:id", verifyToken, deleteCategories);

router.get("/stocks", verifyToken, getStockList);
router.post("/stock", verifyToken, createStock);
router.get("/stock/categories", verifyToken, getCategoriesList);
router.get("/stock/:id", verifyToken, getByID);
router.put("/stock/:id", verifyToken, updateStocks);
router.delete("/stock/:id", verifyToken, deleteRecord);


export default router;