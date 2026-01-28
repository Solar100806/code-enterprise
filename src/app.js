import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import router from "./routes/index.js";
import errorHandler from "./middlewares/ErrorHandler.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
});