const asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            const result = await fn(req, res, next);
            if (result !== undefined && !res.headersSent) {
                return res.json(result);
            }
        } catch (err) {
            return next(err);
        }
    };
};

export default asyncHandler;
