import { Router } from "express";
import { getAllPosts, getPostByid, createPost, updatePost, deletePost } from "../controllers/post.controller.js";
import validateRequest from "../middlewares/request.middleware.js";
import postValidation from "../validation/post.validation.js";

const postRouter = Router();
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostByid);
postRouter.post("/", validateRequest(postValidation), createPost);
postRouter.put("/:id", validateRequest(postValidation), updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
