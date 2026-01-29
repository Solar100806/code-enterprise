import ApiError from '../utils/api-error.util.js';

const validateRequest = (schema, target = "body") => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[target], {
            abortEarly: false,
            stripUnknown: true
        });

        if (error) {
            const message = error.details.map((err) => err.message).join(', ');
            return next(new ApiError(400, message));
        }

        req[target] = value;
        next();
    }
}

export default validateRequest;