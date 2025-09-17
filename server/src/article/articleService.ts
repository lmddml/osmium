// begin-auto-generated
import type { InsertArticle } from "./articleModel.ts";
import * as articleModel from "./articleModel.ts";

export const getArticles = async () => {
	return await articleModel.getArticles();
};

export const createArticle = async (article: InsertArticle) => {
	return await articleModel.createArticle(article);
};

export const getArticleById = async (id: string) => {
	return await articleModel.getArticleById(id);
};

export const updateArticle = async (id: string, article: InsertArticle) => {
	return await articleModel.updateArticle(id, article);
};

export const deleteArticle = async (id: string) => {
	return await articleModel.deleteArticle(id);
};
// end-auto-generated
