import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/", authRoutes);

// Start server after DB connection
const startServer = async () => {
  await connectDB();
  app.listen(process.env.APP_PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${process.env.APP_PORT}`);
  });
};

startServer();
