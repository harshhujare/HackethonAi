import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import airouter from "./router/router.ai.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./connection/connection.js";
import authrouter from "./router/router.Auth.js";

const origins = ["http://localhost:5173", "http://localhost:5174"];
dotenv.config();
const app = express();
app.use(express.json());
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cookieParser());
app.use(
  cors({
    origin: origins,
  })
);
// expose the genAI client to route handlers
app.locals.genAI = genAI;

app.use("/ai", airouter);
app.use("/auth", authrouter);
connectDb("mongodb://127.0.0.1:27017/ZenAi");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
