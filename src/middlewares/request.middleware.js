// src/middlewares/validate.middleware.js
import ApiError from '../utils/api-error.util.js';

const validateRequest = (schema, target = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[target], {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            // Lấy danh sách lỗi
            const message = error.details.map((err) => err.message).join(', ');

            // Ném cho Error Middleware
            return next(new ApiError(400, message));
        }

        // Gán lại dữ liệu đã được làm sạch (stripUnknown)
        req[target] = value;
        next();
    }
}


export default validateRequest; // Dùng cái này nếu project setup kiểu ES Modules