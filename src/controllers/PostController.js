import asyncHandler from "../utils/asyncHandler.js";
import * as PostService from "../services/PostService.js";

export const getAllPosts = asyncHandler(async (req, res) => {
    const result = await PostService.findAll(req.query);
    return res.json(result);
});

export const getPostByid = asyncHandler(async (req, res) => {
    const post = await PostService.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết!" });
    return res.json(post);
});

export const createPost = asyncHandler(async (req, res) => {
    const newPost = await PostService.create(req.body);
    return res.status(201).json({ message: "Thêm bài viết thành công", data: newPost });
});

export const updatePost = asyncHandler(async (req, res) => {
    const post = await PostService.update(req.params.id, req.body);
    if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết!" });
    return res.json({ message: "Sửa bài viết thành công", data: post });
});

export const deletePost = asyncHandler(async (req, res) => {
    const post = await PostService.remove(req.params.id);
    if (!post) return res.status(404).json({ message: "Không tìm thấy bài viết!" });
    return res.json({ success: true });
});
