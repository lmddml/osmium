// begin-auto-generated
import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { articles } from "../db/schema.ts";
import type { QueryArticle } from "../types.ts";

export type InsertArticle = typeof articles.$inferInsert;
export type SelectArticle = typeof articles.$inferSelect;

export const getArticles = async ({
	page = 1,
	perPage = 100,
	filter = {},
}: QueryArticle) => {
	const { id, name } = filter;
	const where = {
		...(id !== undefined && { id }),
		...(name !== undefined && { name }),
	};
	return db.query.articles.findMany({
		with: {
			unit: true,
		},
		limit: perPage,
		offset: (page - 1) * perPage,
		where,
	});
};

export const getArticleById = async (id: string): Promise<SelectArticle> => {
	const article = await db.query.articles.findFirst({ where: { id } });

	if (!article) {
		throw new Error("Article not found");
	}

	return article;
};

export const createArticle = async (article: InsertArticle) => {
	const result = await db.insert(articles).values(article).returning();
	if (result.length !== 1) {
		throw new Error("Article not created");
	}
	return result[0] as SelectArticle;
};

export const updateArticle = async (id: string, article: InsertArticle) => {
	const result = await db
		.update(articles)
		.set(article)
		.where(eq(articles.id, id))
		.returning();
	if (result.length !== 1) {
		throw new Error("Article not updated");
	}
	return result[0] as SelectArticle;
};

export const deleteArticle = async (id: string) => {
	const result = await db
		.delete(articles)
		.where(eq(articles.id, id))
		.returning();
	if (result.length !== 1) {
		throw new Error("Article not deleted");
	}
	return result[0] as SelectArticle;
};
// end-auto-generated
