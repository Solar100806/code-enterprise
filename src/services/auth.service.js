import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/api-error.util.js";

export const login = async ({ email, password }) => {
    if (!process.env.JWT_SECRET) {
        throw new ApiError(500, "JWT_SECRET không được cấu hình");
    }

    const user = await User.findOne({ email });

    const isPasswordMatch = user && (await bcrypt.compare(password, user.password));

    if (!user || !isPasswordMatch) {
        throw new ApiError(401, "Email hoặc mật khẩu không chính xác");
    }

    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    return { accessToken: token, user: userResponse };
};

export const register = async ({ username, email, password }) => {
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new ApiError(409, "Email này đã được sử dụng!");
    }
    const newUser = await User.create({
        username,
        email,
        password,
        role: "user"
    });

    const userResponse = newUser.toObject();
    delete userResponse.password;

    return userResponse;
};