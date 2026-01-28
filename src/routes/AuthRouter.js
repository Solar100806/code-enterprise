import { Router } from "express";
import { signup, signin } from "../controllers/AuthController.js";
import validateRequest from "../middlewares/ValidateRequest.js";
import { registerValidation, loginValidation } from "../../validation/AuthValidation.js";


const authRouter = Router();
authRouter.post("/signup", validateRequest(registerValidation), signup);
authRouter.post("/signin", validateRequest(loginValidation), signin);

export default authRouter;
