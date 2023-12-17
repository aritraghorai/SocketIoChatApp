import catchAsync from "@/utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const ValidateRequest = (schema: AnyZodObject) =>
	catchAsync(async (req: Request, res: Response, next: NextFunction) => {
		console.log(req.body);
		await schema.parseAsync(req.body);
		next();
	});

export default ValidateRequest;
