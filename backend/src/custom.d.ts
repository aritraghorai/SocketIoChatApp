import { HydratedDocument } from "mongoose";
import { IUser } from "./models/user";

declare module "express" {
	interface Request {
		user?: HydratedDocument<IUser>;
	}
}

declare module "socket.io" {
	interface Socket {
		user?: HydratedDocument<IUser>;
	}
}
