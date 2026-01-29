import Post from "../models/post.model.js";
import ApiError from "../utils/api-error.util.js";

export const findAll = async ({ _limit, _page, _sort, _order }) => {
    const page = Math.max(1, parseInt(_page, 10) || 1);
    const limit = Math.max(1, parseInt(_limit, 10) || 10);
    const skip = (page - 1) * limit;

    const filter = {};
    const allowedSortFields = ['createdAt', 'updatedAt', 'title', 'views'];
    const sortBy = allowedSortFields.includes(_sort) ? _sort : 'createdAt';
    const sortOrder = _order === 'asc' ? 1 : -1;

    const [posts, totalItems] = await Promise.all([
        Post.find(filter)
            .sort({ [sortBy]: sortOrder })
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
