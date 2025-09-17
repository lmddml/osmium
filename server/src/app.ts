import type { Express } from "express";
import express from "express";
import { router as articleRouter } from "./article/articleRoutes.ts";
import { router as customerRouter } from "./customer/customerRoutes.ts";
import { router as unitRouter } from "./unit/unitRoutes.ts";

export const buildApp = (): Express => {
	const app = express();
	app.use(express.json());
	app.use("/customers", customerRouter);
	app.use("/articles", articleRouter);
	app.use("/units", unitRouter);
	return app;
};
