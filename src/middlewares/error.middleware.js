const errorMiddleware = (err, req, res, next) => {
    console.error("[Global Error]:", err);

    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || "Lỗi Server (Internal Server Error)";

    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
        ...(statusCode !== 500 && { errorDetail: err })
    });
};

export default errorMiddleware;