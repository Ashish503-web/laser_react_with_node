import {v4 as uuid4} from "uuid";
import jwt  from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import bcrypt from "bcryptjs";

import {
     createTable,
     checkRecordExits,
     insertRecord
} from "../models/User.js"

const generateAccessToken = (userId) => {
     return jwt.sign({ userId}, process.env.JWT_SECRET, { expiresIn: "7d"});
};

export const register = async (req, res) =>{
     const { email, password} = req.body;
     if(!email || !password){
          res.
          status(400).
          json({ error: "Email or password fields cannot be empty"});
          return;
     }

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     const user ={
          userId: uuid4(),
          email,
          password: hashedPassword,
     };

     try{
          await createTable(userSchema);
          const userAlreadyExits = await checkRecordExits("users", "email", email);
          if(userAlreadyExits){
               res.status(400).json({error: "Email already exits"});
          } else {
               await insertRecord("users",user);
               res.status(201).json({ message: "user created successfully!"});
          }

     }catch (error){
          res.status(500).json( {error: error.message});
     }
};


export const login = async (req, res) => {
     const {email, password } = req.body;
     if(!email || !password){
          res.status(400).json({error: "Email or Password can not be empty!"});
          return;
     }

     try{
          const existingUser = await checkRecordExits("users", "email", email);
          if(existingUser){
               if(!existingUser){
                    res.status(401).json({ error: "Invalid credentials"})
                    return;
               }

               const passwordMatch = await bcrypt.compare(
                    password,
                    existingUser.password
               );

               if(passwordMatch){
                    res.
                    status(200).json({
                         userId: existingUser.userId,
                         email: existingUser.email,
                         access_token: generateAccessToken(existingUser.userId),
                    });
               }else{
                    res.status(401).json({ error: "Invalid credentials"});
               }
          }else {
               res.status(401).json({ error: "Invalid credentials"});
          }
     }catch (error) {
          res.status(500).json({ error: error.message});
     }
};