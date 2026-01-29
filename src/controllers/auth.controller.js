import asyncHandler from "../utils/async-handler.util.js";
import * as AuthService from "../services/auth.service.js";

// Đăng ký
export const signup = asyncHandler(async (req, res) => {
    const newUser = await AuthService.register(req.body);

    res.status(201).json({
        message: "Đăng ký thành công!",
        data: newUser
    });
});

// Đăng nhập
export const signin = asyncHandler(async (req, res) => {
    const { accessToken, user } = await AuthService.login(req.body);

    res.status(200).json({
        message: "Đăng nhập thành công",
        data: {
            accessToken,
            user
        }
    });
});