import asyncHandler from "../utils/async-handler.util.js";
import * as AuthService from "../services/auth.service.js";

// Đăng ký
export const signup = asyncHandler(async (req, res) => {
    const newUser = await AuthService.register(req.body);

    // Vẫn giữ status 201, nhưng dùng return để gửi data
    res.status(201);
    return {
        message: "Đăng ký thành công!",
        data: newUser
    };
});

// Đăng nhập
export const signin = asyncHandler(async (req, res) => {
    const { accessToken, user } = await AuthService.login(req.body);

    // Login thành công là 200, chỉ cần return là đủ
    return {
        message: "Đăng nhập thành công",
        data: { accessToken, user }
    };
});