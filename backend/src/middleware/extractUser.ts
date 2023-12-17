import user, { IUser } from "@/models/user";
import jwtService, { JwtPayload } from "@/service/jwt.service";
import AppError from "@/utils/AppError";
import catchAsync from "@/utils/catchAsync";
import { NextFunction, Request } from "express";
import { HydratedDocument } from "mongoose";

declare module "express" {
	interface Request {
		user?: HydratedDocument<IUser>;
	}
}

const extractUser = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
		const token = req.headers.authorization?.split(" ")[1];

		if (token) {
			const payload = (await jwtService.verifyToken(token)) as JwtPayload;
			const getUser = await user.findById(payload.id);
			if (getUser) {
				req.user = getUser;
			}
		} else {
			throw new AppError("Unauthorized", 401);
		}
		next();
	},
);
export default extractUser;
