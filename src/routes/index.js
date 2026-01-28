import { Router } from "express";
import postRouter from "./PostRouter.js";
import authRouter from "./AuthRouter.js";

const router = Router();
router.use("/post", postRouter);
router.use("/auth", authRouter);

export default router;
