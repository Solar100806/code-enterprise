import Joi from "joi";

// 1. Schema cho Đăng ký (Register)
export const registerValidation = Joi.object({
    username: Joi.string()
        .required()
        .min(3)
        .max(30)
        // Bỏ alphanum, thay bằng regex để cho phép chữ, số, gạch dưới, gạch ngang
        .pattern(/^[a-zA-Z0-9_-]+$/)
        .messages({
            "string.pattern.base": "Username chỉ được chứa chữ, số, dấu gạch ngang (-) và gạch dưới (_)",
            "string.empty": "Username không được để trống",
            "any.required": "Username là bắt buộc"
        }),

    email: Joi.string()
        .required()
        .email({ tlds: { allow: false } }) // Cho phép mọi đuôi email (tránh lỗi 1 số đuôi lạ)
        .lowercase()
        .messages({
            "string.email": "Email không hợp lệ",
            "string.empty": "Email không được để trống",
            "any.required": "Email là bắt buộc"
        }),

    password: Joi.string()
        .required()
        .min(8) // Nâng lên 8 ký tự
        .messages({
            "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự",
            "string.empty": "Mật khẩu không được để trống",
            "any.required": "Mật khẩu là bắt buộc"
        }),

    // Quan trọng: Field xác nhận mật khẩu
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('password')) // Kiểm tra phải giống field password
        .messages({
            "any.only": "Mật khẩu xác nhận không khớp",
            "any.required": "Vui lòng xác nhận mật khẩu"
        })
});

// 2. Schema cho Đăng nhập (Login)
// Login thường lỏng hơn, không cần check min/max hay confirm, chỉ cần có dữ liệu gửi lên là được
export const loginValidation = Joi.object({
    email: Joi.string().required().email().messages({
        "string.empty": "Email không được để trống",
        "any.required": "Email là bắt buộc"
    }),
    password: Joi.string().required().messages({
        "string.empty": "Mật khẩu không được để trống",
        "any.required": "Mật khẩu là bắt buộc"
    })
});