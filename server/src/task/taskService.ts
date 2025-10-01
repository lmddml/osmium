// begin-auto-generated
import type { InsertTask, QueryTask } from "../types.ts";
import * as taskModel from "./taskModel.ts";

export const getTasks = async (query: QueryTask) => {
	return await taskModel.getTasks(query);
};

export const createTask = async (task: InsertTask) => {
	return await taskModel.createTask(task);
};

export const getTaskById = async (id: string) => {
	return await taskModel.getTaskById(id);
};

export const updateTask = async (id: string, task: InsertTask) => {
	return await taskModel.updateTask(id, task);
};

export const deleteTask = async (id: string) => {
	return await taskModel.deleteTask(id);
};
// end-auto-generated
