// begin-auto-generated
import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { articles } from "../db/schema.ts";

export type InsertArticle = typeof articles.$inferInsert;

export const getArticles = async () => {
        const result = await db.query.articles.findMany({
                with: {
                        unit: true,
                },
        });

        return result;
};

export type SelectArticle = Awaited<ReturnType<typeof getArticles>>[number];

export const getArticleById = async (id: string): Promise<SelectArticle> => {
        const article = await db.query.articles.findFirst({
                where: (article, { eq }) => eq(article.id, id),
                with: {
                        unit: true,
                },
        });

        if (!article) {
                throw new Error("Article not found");
        }

        return article;
};

export const createArticle = async (article: InsertArticle): Promise<SelectArticle> => {
        const [result] = await db
                .insert(articles)
                .values(article)
                .returning({ id: articles.id });

        if (!result) {
                throw new Error("Article not created");
        }

        return await getArticleById(result.id);
};

export const updateArticle = async (
        id: string,
        article: InsertArticle,
): Promise<SelectArticle> => {
        const [updated] = await db
                .update(articles)
                .set(article)
                .where(eq(articles.id, id))
                .returning({ id: articles.id });

        if (!updated) {
                throw new Error("Article not updated");
        }

        return await getArticleById(updated.id);
};

export const deleteArticle = async (id: string): Promise<SelectArticle> => {
        const article = await getArticleById(id);

        const result = await db
                .delete(articles)
                .where(eq(articles.id, id))
                .returning({ id: articles.id });

        if (result.length !== 1) {
                throw new Error("Article not deleted");
        }

        return article;
};
// end-auto-generated
