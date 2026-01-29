import ApiError from "../utils/api-error.util.js";

const notFoundMiddleware = (req, res, next) => {
    return next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

export default notFoundMiddleware;

