import z from "zod";

export const SignUpRequestBodyValidator = z.object({
	name: z.string().min(3).max(255),
	email: z.string().email(),
	password: z.string().min(8).max(255),
});

export type SignUpRequestBody = z.infer<typeof SignUpRequestBodyValidator>;

export const SignInRequestBodyValidator = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(255),
});

export type SignInRequestBody = z.infer<typeof SignInRequestBodyValidator>;
