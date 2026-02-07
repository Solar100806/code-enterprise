import Post from "../models/post.model.js";
import ApiError from "../utils/api-error.util.js";

export const findAll = async (query) => {
    // 1. Destructuring & Gán giá trị mặc định ngay từ đầu
    // Lấy thêm _q (query) để làm tính năng tìm kiếm
    const {
        _limit = 10,
        _page = 1,
        _sort = 'createdAt',
        _order = 'desc',
        _q = ''
    } = query;

    // 2. Xử lý phân trang an toàn
    const limit = Math.max(1, parseInt(_limit) || 10);
    const page = Math.max(1, parseInt(_page) || 1);
    const skip = (page - 1) * limit;

    // 3. Xử lý Filter (Bộ lọc & Tìm kiếm)
    const filter = {};

    // Nếu có từ khóa tìm kiếm (_q), ta sẽ tìm trong Title hoặc Author
    if (_q) {
        filter.$or = [
            { title: { $regex: _q, $options: 'i' } },  // 'i' là không phân biệt hoa thường
            { author: { $regex: _q, $options: 'i' } }
        ];
    }

    // 4. Xử lý Sắp xếp (Sorting) - QUAN TRỌNG
    // Chỉ cho phép sort theo các trường CÓ THẬT trong Model của bạn
    // (Mình thêm 'price' vào đây phòng trường hợp bạn đã update model)
    const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'author', 'price'];

    const sortBy = allowedSortFields.includes(_sort) ? _sort : 'createdAt';
    const sortOrder = _order === 'asc' ? 1 : -1; // Mặc định là giảm dần (-1) cho bài mới nhất/giá cao nhất

    // 5. Query Database (Chạy song song)
    const [posts, totalItems] = await Promise.all([
        Post.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean() // Tăng tốc độ đọc
            .exec(),
        Post.countDocuments(filter) // Đếm dựa trên kết quả lọc được (search)
    ]);

    // 6. Trả về kết quả chuẩn
    return {
        data: posts,
        pagination: {
            page,
            limit,
            totalItems,
            totalPage: Math.ceil(totalItems / limit) || 1
        },
    };
};

export const findById = async (id) => {
    const post = await Post.findById(id);
    if (!post) {
        throw new ApiError(404, "Không tìm thấy bài viết!");
    }
    return post;
};

export const create = async (payload) => {
    return Post.create(payload);
};

export const update = async (id, payload) => {
    const post = await Post.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
    if (!post) {
        throw new ApiError(404, "Không tìm thấy bài viết!");
    }
    return post;
};

export const remove = async (id) => {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
        throw new ApiError(404, "Không tìm thấy bài viết!");
    }
    return post;
};
