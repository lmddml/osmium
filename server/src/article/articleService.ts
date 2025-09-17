// begin-auto-generated
import type { InsertArticle, SelectArticle } from "./articleModel.ts";
import * as articleModel from "./articleModel.ts";

export type { InsertArticle, SelectArticle } from "./articleModel.ts";

export const getArticles = async (): Promise<SelectArticle[]> => {
	return await articleModel.getArticles();
};

export const createArticle = async (
	article: InsertArticle,
): Promise<SelectArticle> => {
	return await articleModel.createArticle(article);
};

export const getArticleById = async (id: string): Promise<SelectArticle> => {
	return await articleModel.getArticleById(id);
};

export const updateArticle = async (
	id: string,
	article: InsertArticle,
): Promise<SelectArticle> => {
	return await articleModel.updateArticle(id, article);
};

export const deleteArticle = async (id: string): Promise<SelectArticle> => {
	return await articleModel.deleteArticle(id);
};
// end-auto-generated
