import { Router } from "express";
import { signup, signin } from "../controllers/auth.controller.js";
import validateRequest from "../middlewares/request.middleware.js";
import { registerValidation, loginValidation } from "../validation/auth.validation.js";


const authRouter = Router();
authRouter.post("/signup", validateRequest(registerValidation), signup);
authRouter.post("/signin", validateRequest(loginValidation), signin);

export default authRouter;
