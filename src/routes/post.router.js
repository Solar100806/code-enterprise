import { Router } from "express";
import { getAllPosts, getPostById, createPost, updatePost, deletePost } from "../controllers/post.controller.js";
import validateRequest from "../middlewares/request.middleware.js";
import validateObjectId from "../middlewares/validate-objectid.middleware.js";
import postValidation from "../validations/post.validation.js";

const postRouter = Router();
postRouter.get("/", getAllPosts);
postRouter.get("/:id", validateObjectId(), getPostById);
postRouter.post("/", validateRequest(postValidation), createPost);
postRouter.put("/:id", validateObjectId(), validateRequest(postValidation), updatePost);
postRouter.delete("/:id", validateObjectId(), deletePost);

export default postRouter;
