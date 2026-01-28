import { Router } from "express";
import { getAllPosts, getPostByid, createPost, updatePost, deletePost } from "../controllers/PostController.js";
import validateRequest from "../middlewares/ValidateRequest.js";
import postValidation from "../utils/validation/PostValidation.js";

const postRouter = Router();
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPostByid);
postRouter.post("/", validateRequest(postValidation), createPost);
postRouter.put("/:id", validateRequest(postValidation), updatePost);
postRouter.delete("/:id", deletePost);

export default postRouter;
