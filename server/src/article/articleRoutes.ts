// begin-auto-generated
import type { Response } from "express";
import express from "express";
import type { InsertArticle, SelectArticle } from "./articleService.ts";
import {
	createArticle,
	deleteArticle,
	getArticleById,
	getArticles,
	updateArticle,
} from "./articleService.ts";

export const router = express.Router();

const toInsertArticle = (payload: unknown): InsertArticle => {
	const { articleNumber, name, description, price, unitId } = (payload ??
		{}) as InsertArticle;

	return {
		articleNumber,
		name,
		description,
		price,
		unitId,
	};
};

router.get("/", async (_req, res: Response<SelectArticle[]>) => {
	const articles = await getArticles();
	res.json(articles);
});

router.post("/", async (req, res: Response<SelectArticle>) => {
	const article = await createArticle(toInsertArticle(req.body));
	res.json(article);
});

router.get("/:id", async (req, res: Response<SelectArticle>) => {
	const id = req.params.id;
	const article = await getArticleById(id);
	res.json(article);
});

router.put("/:id", async (req, res: Response<SelectArticle>) => {
	const id = req.params.id;
	const article = await updateArticle(id, toInsertArticle(req.body));
	res.json(article);
});

router.delete("/:id", async (req, res: Response<SelectArticle>) => {
	const id = req.params.id;
	const article = await deleteArticle(id);
	res.json(article);
});
// end-auto-generated
