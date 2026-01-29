import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ApiError from "../utils/api-error.util.js"; // Nhớ import class này

// Login Service
export const login = async ({ email, password }) => {
    // 1. Tìm user
    const user = await User.findOne({ email });

    // 2. Check Password
    // Lưu ý: Nếu user không tồn tại, bcrypt.compare vẫn chạy tốt với null nhưng trả về false
    // Nhưng để an toàn, check user tồn tại trước
    const isPasswordMatch = user && (await bcrypt.compare(password, user.password));

    if (!user || !isPasswordMatch) {
        // SỬA: Dùng 401 và thông báo chung chung để chống hack
        throw new ApiError(401, "Email hoặc mật khẩu không chính xác");
    }

    // 3. Tạo Token
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // 4. Return
    // Mẹo: Dùng spread operator (...) để bỏ password nhanh gọn
    const userResponse = user.toObject();
    delete userResponse.password;

    return { accessToken: token, user: userResponse };
};

// Register Service
export const register = async ({ username, email, password }) => {
    // 1. Check tồn tại
    const userExists = await User.findOne({ email });

    if (userExists) {
        // SỬA: Dùng 409 (Conflict) và báo Email đã tồn tại
        throw new ApiError(409, "Email này đã được sử dụng!");
    }

    // 2. Tạo user 
    // LƯU Ý QUAN TRỌNG: Bạn đang tin tưởng vào User Model có Pre-save hook để hash pass.
    // Nếu Model chưa có đoạn đó, password sẽ bị lộ. Kiểm tra kỹ model nhé!
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