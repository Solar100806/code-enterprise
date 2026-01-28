import Post from "../models/post.model.js";

export const findAll = async ({ _limit, _page, _sort, _order }) => {
    // 1. Chuẩn hóa Input
    const page = Math.max(1, parseInt(_page, 10) || 1);
    const limit = Math.max(1, parseInt(_limit, 10) || 10);
    const skip = (page - 1) * limit;

    // 2. Cấu hình Filter & Whitelist Sort
    const filter = {}; // Sau này có thể thêm: { title: { $regex: ... } }

    // Chỉ cho phép sort theo các trường an toàn
    const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'views'];
    const sortBy = allowedSortFields.includes(_sort) ? _sort : 'createdAt';
    const sortOrder = _order === 'asc' ? 1 : -1;

    // 3. Thực thi song song (Parallel Execution)
    const [posts, totalItems] = await Promise.all([
        Post.find(filter)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(limit)
            .lean() // <--- TỐI ƯU HIỆU NĂNG: Trả về JSON thuần thay vì Mongoose Docs
            .exec(),

        Post.countDocuments(filter) // An toàn hơn estimatedDocumentCount nếu có soft-delete
    ]);

    // 4. Trả về kết quả
    return {
        data: posts,
        pagination: {
            page,
            limit,
            totalItems,
            totalPage: Math.ceil(totalItems / limit) || 1 // Tránh NaN nếu totalItems = 0
        },
    };
};

export const findById = async (id) => {
    return Post.findById(id);
};

export const create = async (payload) => {
    return Post.create(payload);
};

export const update = async (id, payload) => {
    return Post.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
};

export const remove = async (id) => {
    return Post.findByIdAndDelete(id);
};
