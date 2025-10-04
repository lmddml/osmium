import type { ErrorRequestHandler } from "express";
import { AppError } from "../errors/AppError.ts";

const isProduction = process.env.NODE_ENV === "production";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
	if (!isProduction) {
		console.error("Unhandled error", error.stack ?? error);
	}

	if (error instanceof AppError) {
		res.status(error.statusCode).json({ message: error.message });
		return;
	}

	res.status(500).json({ message: "Internal Server Error" });
};
