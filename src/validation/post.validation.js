import Joi from "joi";

const postValidation = Joi.object({
    title: Joi.string()
        .required()
        .trim() // Tự động xóa space thừa: "  ABC  " -> "ABC"
        .min(6) // Tối thiểu 6 ký tự
        .max(255) // Tối đa 255 ký tự
        .messages({
            "string.empty": "Tiêu đề không được để trống",
            "any.required": "Tiêu đề là bắt buộc",
            "string.min": "Tiêu đề phải có ít nhất {#limit} ký tự",
            "string.max": "Tiêu đề không được vượt quá {#limit} ký tự"
        }),

    content: Joi.string()
        .required()
        .trim() // Quan trọng để tránh user spam space
        .messages({
            "string.empty": "Nội dung không được để trống",
            "any.required": "Nội dung là bắt buộc"
        }),

    // LƯU Ý: Nếu author là ID (MongoDB ObjectId), check kỹ ở mục 3 bên dưới
    author: Joi.string()
        .required()
        .trim()
        .messages({
            "string.empty": "Tác giả không được để trống",
            "any.required": "Tác giả là bắt buộc"
        })
});

export default postValidation;