// utils/ApiError.js
class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        // Có thể thêm custom property nếu muốn middleware log ra
        // this.isOperational = true; 
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;