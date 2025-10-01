// begin-auto-generated
import type { Response } from "express";
import express from "express";
import type { InsertTask, QueryTask, SelectTask } from "../types.ts";
import {
	createTask,
	deleteTask,
	getTaskById,
	getTasks,
	updateTask,
} from "./taskService.ts";

export const router = express.Router();

router.get("/", async (req, res: Response<SelectTask[]>) => {
	const { page, perPage, id, orderId } = req.query;

	const query: QueryTask = {
		page: page === undefined ? undefined : parseInt(page as string, 10),
		perPage:
			perPage === undefined ? undefined : parseInt(perPage as string, 10),
		filter: {
			id: typeof id === "string" ? id : undefined,
			orderId: typeof orderId === "string" ? orderId : undefined,
		},
	};

	const tasks = await getTasks(query);
	res.json(tasks);
});

router.post("/", async (req, res: Response<SelectTask>) => {
	const result: InsertTask = req.body;
	const task = await createTask(result);
	res.json(task);
});

router.get("/:id", async (req, res: Response<SelectTask>) => {
	const id = req.params.id;
	const task = await getTaskById(id);
	res.json(task);
});

router.put("/:id", async (req, res: Response<SelectTask>) => {
	const id = req.params.id;
	const result: InsertTask = req.body;
	const task = await updateTask(id, result);
	res.json(task);
});

router.delete("/:id", async (req, res: Response<SelectTask>) => {
	const id = req.params.id;
	const task = await deleteTask(id);
	res.json(task);
});
// end-auto-generated
