import { InferSchemaType, Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import env from "@/utils/env";

type User = {
	name: string;
	email: string;
	password: string;
};

const User = new Schema<User, Model<User>>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		requiered: true,
	},
	password: {
		type: String,
		required: true,
		select: false,
	},
});

export type IUser = InferSchemaType<typeof User>;

User.pre("save", async function (next) {
	const hash = await bcrypt.hash(this.password, env.HASH_SALT);
	this.password = hash;
	next();
});

export default model("User", User);
