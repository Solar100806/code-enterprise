import mongoose from "mongoose";

// Biến global để cache connection (quan trọng cho môi trường dev/serverless)
let isConnected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    // 1. Nếu đã kết nối rồi thì không cần kết nối lại
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    // 2. Kiểm tra state hiện tại của mongoose
    // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    if (mongoose.connection.readyState === 1) {
        isConnected = true;
        console.log('MongoDB already connected.');
        return;
    }

    try {
        if (!process.env.MONGO_URI) {
            throw new Error("Biến môi trường MONGO_URI chưa được định nghĩa.");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Các option này hiện tại Mongoose 6+ đã mặc định là true, 
            // nhưng nếu muốn chỉnh Time out hoặc PoolSize thì thêm vào đây.
            // serverSelectionTimeoutMS: 5000, 
            // maxPoolSize: 10,
        });

        isConnected = true; // Đánh dấu đã kết nối
        console.log(`✅ MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);

    } catch (error) {
        console.error(`❌ Lỗi kết nối MongoDB: ${error.message}`);
        // Chỉ exit nếu đây là lần khởi tạo đầu tiên thất bại
        process.exit(1);
    }
};

// Event listeners giữ nguyên là rất tốt
mongoose.connection.on('disconnected', () => {
    isConnected = false;
    console.warn('⚠️ MongoDB đã bị ngắt kết nối!');
});

mongoose.connection.on('reconnected', () => {
    isConnected = true;
    console.log('🔄 MongoDB đã kết nối lại.');
});

export default connectDB;