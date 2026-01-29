import asyncHandler from "../utils/async-handler.util.js";
import * as PostService from "../services/post.service.js";

export const getAllPosts = asyncHandler(async (req, res) => {
    const result = await PostService.findAll(req.query);
    res.status(200).json(result);
});

export const getPostByid = asyncHandler(async (req, res) => {
    const post = await PostService.findById(req.params.id);
    if (!post)
        return res.status(404).json({ message: "Không tìm thấy bài viết!" });
    return res.status(200).json(post);
});

export const createPost = asyncHandler(async (req, res) => {
    const newPost = await PostService.create(req.body);
    res.status(201).json(newPost);
});

export const updatePost = asyncHandler(async (req, res) => {
    const post = await PostService.update(req.params.id, req.body);
    if (!post)
        return res.status(404).json({ message: "Không tìm thấy bài viết!" });
    return res.status(200).json({ message: "Sửa bài viết thành công", data: post });
});

export const deletePost = asyncHandler(async (req, res) => {
    const post = await PostService.remove(req.params.id);
    if (!post) {
        res.status(404).json({ message: "Không tìm thấy bài viết!" });
        return;
    }
    res.status(200).json({ message: "Xóa bài viết thành công" });
});
