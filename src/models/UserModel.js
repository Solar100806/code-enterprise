import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Nhớ cài thư viện: npm install bcryptjs

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // Tự động xóa khoảng trắng thừa 2 đầu
        minlength: 3
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Vui lòng nhập đúng định dạng email"
        ]
    },

    password: {
        type: String,
        required: true,
        minlength: 6 // Mật khẩu nên tối thiểu 6 ký tự
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps: true,
    versionKey: false
});

/**
 * PRE-SAVE HOOK
 * Tự động chạy trước khi lệnh .save() hoặc .create() được thực thi
 */
userSchema.pre("save", async function (next) {
    // Nếu password không bị thay đổi (chỉ sửa username, role...), thì bỏ qua
    if (!this.isModified("password")) return next();

    try {
        // Tạo salt và hash password
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model("User", userSchema);
export default User;