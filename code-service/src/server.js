import http from "http";
import app from "./app.js";
import connectDB from "./db/db.js";

const PORT = process.env.PORT

connectDB();

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});