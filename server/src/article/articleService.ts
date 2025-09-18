// begin-auto-generated
import type { InsertArticle, QueryArticle } from "../types.ts";
import * as articleModel from "./articleModel.ts";

export const getArticles = async (query: QueryArticle) => {
	return await articleModel.getArticles(query);
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
