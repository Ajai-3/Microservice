import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config()

import commentRouter from "./routes/comment.route.js";

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/snippet", commentRouter);

export default app;
