import asyncHandler from "../utils/async-handler.util.js";
import * as PostService from "../services/post.service.js";

export const getAllPosts = asyncHandler(async (req, res) => {
    const result = await PostService.findAll(req.query);
    res.status(200).json({
        message: "Lấy danh sách bài viết thành công",
        ...result
    });
});

export const getPostById = asyncHandler(async (req, res) => {
    const post = await PostService.findById(req.params.id);
    res.status(200).json({ data: post });
});

export const createPost = asyncHandler(async (req, res) => {
    const newPost = await PostService.create(req.body);
    res.status(201).json({ message: "Tạo bài viết thành công", data: newPost });
});

export const updatePost = asyncHandler(async (req, res) => {
    const post = await PostService.update(req.params.id, req.body);
    res.status(200).json({ message: "Sửa bài viết thành công", data: post });
});

export const deletePost = asyncHandler(async (req, res) => {
    await PostService.remove(req.params.id);
    res.status(200).json({ message: "Xóa bài viết thành công" });
});
