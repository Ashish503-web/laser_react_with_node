import express from "express";
import {register,login} from "../controllers/auth.js"
import { getUsersLIst } from "../controllers/Users.js";

const router = express.Router();

router.post("/register",()=>{
     console.log('hellow');
     
});
router.post("/login",login);

router.get("/users", getUsersLIst);


export default router;