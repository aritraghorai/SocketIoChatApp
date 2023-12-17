import authController from "@/controller/auth.controller";
import ValidateRequest from "@/controller/validateRequest";
import extractUser from "@/middleware/extractUser";
import {
	SignInRequestBodyValidator,
	SignUpRequestBodyValidator,
} from "@/validator/auth.validator";
import { Router } from "express";

const userRouter = Router();

userRouter.post(
	"/register",
	ValidateRequest(SignUpRequestBodyValidator),
	authController.signUpUser,
);
userRouter.post(
	"/login",
	ValidateRequest(SignInRequestBodyValidator),
	authController.signInUser,
);

userRouter.use(extractUser);

userRouter.get("/me", authController.me);

export default userRouter;
