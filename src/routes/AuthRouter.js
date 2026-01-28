import { Router } from "express";
import { signup, signin } from "../controllers/AuthController.js";
import validateRequest from "../middlewares/ValidateRequest.js";
import authValidation from "../utils/validation/AuthValidation.js";

const authRouter = Router();
authRouter.post("/signup", validateRequest(authValidation), signup);
authRouter.post("/signin", validateRequest(authValidation), signin);

export default authRouter;
