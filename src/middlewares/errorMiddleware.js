// middlewares/errorMiddleware.js

// Lưu ý: Middleware xử lý lỗi BẮT BUỘC phải có 4 tham số (err, req, res, next)
const errorMiddleware = (err, req, res, next) => {
    // 1. Log lỗi để debug
    console.error("🔥 [Global Error]:", err);

    // 2. Lấy status code (mặc định 500)
    const statusCode = err.statusCode || err.status || 500;

    // 3. Chuẩn bị message
    const message = err.message || "Lỗi Server (Internal Server Error)";

    // 4. Trả về response
    res.status(statusCode).json({
        success: false,
        message: message,
        // Chỉ hiện stack trace khi không phải production
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
        // Giữ lại logic errorDetail của bạn nếu thích
        ...(statusCode !== 500 && { errorDetail: err })
    });
};

export default errorMiddleware;