import type { Express } from "express";
import express from "express";
import { router as customerRouter } from "./customer/customerRoutes.ts";

export const buildApp = (): Express => {
	const app = express();
	app.use(express.json());
	app.use("/customers", customerRouter);
	return app;
};
