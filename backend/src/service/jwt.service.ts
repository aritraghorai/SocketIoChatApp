import env from "@/utils/env";
import jwt from "jsonwebtoken";

export type JwtPayload = {
	id: any;
};

const generateToken = (payload: JwtPayload) => {
	return jwt.sign(payload, env.JWT_SECRET, {
		expiresIn: env.JWT_EXPIRES_IN,
	});
};

const verifyToken = (token: string) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, env.JWT_SECRET, (err: any, decoded: any) => {
			if (err) {
				return reject(err);
			}
			resolve(decoded);
		});
	});
};

export default {
	generateToken,
	verifyToken,
};
