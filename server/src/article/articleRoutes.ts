// begin-auto-generated
import type { Response } from "express";
import express from "express";
import type { InsertArticle, QueryArticle, SelectArticle } from "../types.ts";
import {
	createArticle,
	deleteArticle,
	getArticleById,
	getArticles,
	updateArticle,
} from "./articleService.ts";

export const router = express.Router();

router.get("/", async (req, res: Response<SelectArticle[]>) => {
	const { page, perPage, id, articleNumber, name, description, price, unitId } =
		req.query;

	const query: QueryArticle = {
		page: page === undefined ? undefined : parseInt(page as string, 10),
		perPage:
			perPage === undefined ? undefined : parseInt(perPage as string, 10),
		filter: {
			id: typeof id === "string" ? id : undefined,
			articleNumber:
				typeof articleNumber === "string" ? articleNumber : undefined,
			name: typeof name === "string" ? name : undefined,
			description: typeof description === "string" ? description : undefined,
			price: typeof price === "string" ? parseFloat(price) : undefined,
			unitId: typeof unitId === "string" ? unitId : undefined,
		},
	};

	const articles = await getArticles(query);
	res.json(articles);
});

router.post("/", async (req, res: Response<SelectArticle>) => {
	const result: InsertArticle = req.body;
	const article = await createArticle(result);
	res.json(article);
});

router.get("/:id", async (req, res: Response<SelectArticle>) => {
	const id = req.params.id;
	const article = await getArticleById(id);
	res.json(article);
});

router.put("/:id", async (req, res: Response<SelectArticle>) => {
	const id = req.params.id;
	const result: InsertArticle = req.body;
	const article = await updateArticle(id, result);
	res.json(article);
});

router.delete("/:id", async (req, res: Response<SelectArticle>) => {
	const id = req.params.id;
	const article = await deleteArticle(id);
	res.json(article);
});
// end-auto-generated
