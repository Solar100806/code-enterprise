import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Login Service
export const login = async ({ email, password }) => {
    // 1. Tìm user
    const user = await User.findOne({ email });

    // 2. Check Password
    // Mẹo: Dùng user && ... để nếu user null thì vế sau không chạy -> đỡ lỗi crash
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!isMatch) {
        // Lưu ý: Ném Error chung chung để Middleware bắt, hoặc dùng CustomError để có status code
        throw new Error("Email hoặc mật khẩu không đúng");
    }

    // 3. Tạo Token
    const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }



    );

    // 4. Xóa password khi trả về client
    const userResponse = user.toObject();
    delete userResponse.password;

    return { accessToken: token, user: userResponse };
};

// Register Service
export const register = async ({ username, email, password }) => {
    // 1. Check tồn tại
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("Email đã tồn tại");
    }

    // 2. Tạo user 
    // QUAN TRỌNG: Model phải có Pre-save hook để hash password nhé!
    const newUser = await User.create({
        username,
        email,
        password, // Raw password, Model tự hash
        role: "user" // Hardcode role user -> An toàn
    });

    // 3. Return data sạch
    const userResponse = newUser.toObject();
    delete userResponse.password;

    return userResponse;
};