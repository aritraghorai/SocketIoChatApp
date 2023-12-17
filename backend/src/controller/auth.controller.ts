import User, { IUser } from "@/models/user";
import bcryptService from "@/service/bcrypt.service";
import jwtService from "@/service/jwt.service";
import catchAsync from "@/utils/catchAsync";
import env from "@/utils/env";
import {
	SignInRequestBody,
	SignUpRequestBody,
} from "@/validator/auth.validator";
import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

const generateTokenAndSendResponse = (
	user: HydratedDocument<IUser>,
	statusCode: number,
	res: Response,
) => {
	const token = jwtService.generateToken({ id: user._id });

	return res
		.status(statusCode)
		.cookie("token", token, {
			httpOnly: true,
			secure: env.NODE_ENV === "production",
			expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
		})
		.json({ data: user, token });
};

const signUpUser = catchAsync(
	async (req: Request<object, SignUpRequestBody>, res: Response) => {
		const { name, email, password } = req.body;
		const newUser = await User.create({ name, email, password });
		return generateTokenAndSendResponse(newUser, 201, res);
	},
);

const signInUser = catchAsync(
	async (req: Request<object, SignInRequestBody>, res: Response) => {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).select("+password");
		console.log(user?.password);
		if (!user || !(await bcryptService.compare(password, user.password))) {
			return res.status(401).json({ message: "Invalid email or password" });
		}
		return generateTokenAndSendResponse(user, 200, res);
	},
);

const me = catchAsync(async (req: Request, res: Response) => {
	if (!req?.user) {
		return res.status(401).json({ message: "Unauthorized" });
	}
	return generateTokenAndSendResponse(req?.user, 200, res);
});

export default {
	signUpUser,
	signInUser,
	me,
};
