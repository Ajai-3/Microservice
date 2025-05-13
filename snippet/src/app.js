import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import snippetRouter from "./routes/snippet.route.js";

const app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/snippets", snippetRouter);



export default app;
