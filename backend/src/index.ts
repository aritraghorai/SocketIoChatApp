/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import connectDb from "./utils/connectDb";
import globalErrorHandler from "./controller/globalError.controller";
import userRouter from "./router/user.router";
import cookieParser from "cookie-parser";
import cookieSeassion from "cookie-session";
import cors from "cors";
import env from "./utils/env";
import AppError from "./utils/AppError";
import jwtService, { JwtPayload } from "./service/jwt.service";
import user from "./models/user";
import Log from "./utils/logger";

connectDb().catch(() => {
	process.exit(1);
});

const app = express();

app.use(express.json({ strict: false }));
app.use(cookieParser());
app.use(
	cors({
		credentials: true,
		origin: "http://localhost:5173",
		methods: "*",
	}),
);
app.use(
	cookieSeassion({
		name: "token",
		keys: [env.JWT_SECRET],
		maxAge: 24 * 60 * 60 * 1000,
	}),
);

const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
		credentials: true,
	},
});

app.get("/", (req, res) => {
	res.send("<h1>Hello world</h1>");
});
const SOCKET_EVENTS = {
	USER_CONNECTED: "USER_CONNECTED",
	ERROR: "ERROR",
} as const;
const GENERAL = "GENERAL";

io.on("connection", async (socket) => {
	try {
		const token = socket.handshake?.auth?.token;
		if (!token) {
			throw new AppError("Un-authorized handshake. Token is missing", 401);
		}
		const decode = (await jwtService.verifyToken(token)) as JwtPayload;
		const User = await user.findById(decode.id);
		if (!User) {
			throw new AppError("Un-authorized handshake", 401);
		}
		socket.user = User;
		Log.info("User Connected", User);
		socket.emit(SOCKET_EVENTS.USER_CONNECTED, User);
		socket.on("message", (msg: string) => {
			console.log(msg);
			io.emit("message", {
				message: msg,
				userId: socket.user?._id,
			});
		});
	} catch (error: any) {
		Log.error(error);
		socket.emit(
			SOCKET_EVENTS.ERROR,
			error?.message || "Something went wrong while connecting to the socket.",
		);
	}
});

//Routes
app.use("/user", userRouter);

app.use(globalErrorHandler);

server.listen(3000, () => {
	console.log("server running at http://localhost:3000");
});
