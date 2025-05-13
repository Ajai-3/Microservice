import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

export default app;
