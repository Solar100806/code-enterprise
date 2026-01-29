import mongoose from "mongoose";
import ApiError from "../utils/api-error.util.js";

const validateObjectId = (paramName = "id") => {
    return (req, res, next) => {
        const id = req.params[paramName];

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new ApiError(400, `ID không hợp lệ: ${id}`));
        }

        next();
    };
};

export default validateObjectId;
