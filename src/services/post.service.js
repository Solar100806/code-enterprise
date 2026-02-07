import Post from "../models/post.model.js";
import ApiError from "../utils/api-error.util.js";

export const findAll = async (query) => {
    const {
        _limit = 10,
        _page = 1,
        _sort = 'createdAt',
        _order = 'desc',
        _q = ''
    } = query;

    const limit = Math.max(1, parseInt(_limit) || 10);
    const page = Math.max(1, parseInt(_page) || 1);
    const skip = (page - 1) * limit;

    const filter = {};
    if (_q) {
        filter.$or = [
            { title: { $regex: _q, $options: 'i' } },
            { author: { $regex: _q, $options: 'i' } }
        ];
    }

    // 1. Kiểm tra xem trường sort có hợp lệ không
    // Cần đảm bảo model đã có trường 'price'
    const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'author', 'price'];
    const sortBy = allowedSortFields.includes(_sort) ? _sort : 'createdAt';

    // 2. Logic sort chuẩn:
    // desc (-1): Lớn -> Bé (Ví dụ: Giá cao nhất lên đầu)
    // asc  (1): Bé -> Lớn (Ví dụ: Giá rẻ nhất lên đầu)
    const sortOrder = _order === 'asc' ? 1 : -1;

    const [posts, totalItems] = await Promise.all([
        Post.find(filter)
            .sort({ [sortBy]: sortOrder }) // Sort động
            .skip(skip)
            .limit(limit)
            .lean()
            .exec(),
        Post.countDocuments(filter)
    ]);

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
