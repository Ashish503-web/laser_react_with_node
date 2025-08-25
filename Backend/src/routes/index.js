import express from "express";
import { verifyToken } from "../authMiddleware/authMiddleware.js";
import {register,login} from "../controllers/auth.js"
import { getUsersLIst } from "../controllers/Users.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);

router.get("/users", verifyToken, getUsersLIst);

export default router;