import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.config.js";
import router from "./routes/index.js";
import notFoundMiddleware from "./middlewares/not-found.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

const bootstrap = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error);
        process.exit(1); // Dừng chương trình nếu lỗi nghiêm trọng
    }
};

bootstrap();


