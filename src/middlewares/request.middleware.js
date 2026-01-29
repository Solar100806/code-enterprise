// src/middlewares/validate.middleware.js
// Giả sử bạn có class ApiError như mình nói ở bài trước
// const ApiError = require('../utils/api-error.util'); 

const validateRequest = (schema, target = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[target], {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            // Lấy danh sách lỗi
            const message = error.details.map((err) => err.message).join(', ');

            // CÁCH 1: Trả về trực tiếp (Như code bạn - Ổn cho dự án nhỏ)
            /* return res.status(400).json({
                error: "Dữ liệu không hợp lệ!",
                details: error.details.map((err) => err.message)
            });
            */

            // CÁCH 2: Ném cho Error Middleware (Khuyên dùng khi đi làm)
            // Tạo một lỗi 400 và ném xuống dưới
            const apiError = new Error(message); // Hoặc new ApiError(400, message)
            apiError.statusCode = 400;
            return next(apiError);
        }

        // Gán lại dữ liệu đã được làm sạch (stripUnknown)
        req[target] = value;
        next();
    }
}


export default validateRequest; // Dùng cái này nếu project setup kiểu ES Modules