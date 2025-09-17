// begin-auto-generated
import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { articles } from "../db/schema.ts";

export type InsertArticle = typeof articles.$inferInsert;
export type SelectArticle = typeof articles.$inferSelect;

export const getArticles = async () => {
	const result = await db.query.articles.findMany();
	return result;
};

export const getArticleById = async (id: string): Promise<SelectArticle> => {
	const [article] = await db.select().from(articles).where(eq(articles.id, id));

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
