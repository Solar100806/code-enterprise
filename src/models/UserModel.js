import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
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
        minlength: 6
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
 * PRE-SAVE HOOK (ĐÃ SỬA)
 * Với Mongoose mới + Async Function, KHÔNG DÙNG tham số 'next' nữa.
 */
userSchema.pre("save", async function () {
    // 1. Nếu password không bị thay đổi (chỉ sửa username, role...), thì thoát luôn
    if (!this.isModified("password")) return;

    // 2. Hash password trực tiếp
    // Nếu có lỗi (ví dụ bcrypt lỗi), nó sẽ tự động ném ra ngoài (Throw Error)
    // Controller dùng asyncHandler sẽ tự bắt được lỗi này.
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;