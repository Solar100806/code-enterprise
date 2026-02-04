import asyncHandler from "../utils/async-handler.util.js";
import * as PostService from "../services/post.service.js";

// 1. GET ALL: Tận dụng return
export const getAllPosts = asyncHandler(async (req, res) => {
    const result = await PostService.findAll(req.query);
    // Chỉ cần return object, asyncHandler tự res.json() với status 200
    return {
        message: "Lấy danh sách bài viết thành công",
        ...result
    };
});

// 2. GET BY ID: Rất ngắn gọn
export const getPostById = asyncHandler(async (req, res) => {
    const post = await PostService.findById(req.params.id);
    return { data: post };
});

// 3. CREATE: Kết hợp status 201 và return
export const createPost = asyncHandler(async (req, res) => {
    const newPost = await PostService.create(req.body);
    // Set status 201 (Created) nhưng để asyncHandler gửi response
    res.status(201);
    return {
        message: "Tạo bài viết thành công",
        data: newPost
    };
});

// 4. UPDATE: Tận dụng return
export const updatePost = asyncHandler(async (req, res) => {
    const post = await PostService.update(req.params.id, req.body);
    return {
        message: "Sửa bài viết thành công",
        data: post
    };
});

// 5. DELETE: Tận dụng return
export const deletePost = asyncHandler(async (req, res) => {
    await PostService.remove(req.params.id);
    return {
        message: "Xóa bài viết thành công"
    };
});