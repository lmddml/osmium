// begin-auto-generated
import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { tasks } from "../db/schema.ts";
import type { QueryTask } from "../types.ts";

export type InsertTask = typeof tasks.$inferInsert;
export type SelectTask = typeof tasks.$inferSelect;

export const getTasks = async ({
	page = 1,
	perPage = 100,
	filter = {},
}: QueryTask) => {
	const {
		id, // template-id
		orderId
	} = filter;
	const where = {
		...(id !== undefined && { id }), // template-id
		...(orderId !== undefined && { orderId }),
	};
	return db.query.tasks.findMany({
		limit: perPage,
		offset: (page - 1) * perPage,
		where,
	});
};

export const getTaskById = async (id: string): Promise<SelectTask> => {
	const task = await db.query.tasks.findFirst({ where: { id } });

	if (!task) {
		throw new Error("Task not found");
	}

	return task;
};

export const createTask = async (task: InsertTask) => {
	const result = await db.insert(tasks).values(task).returning();
	if (result.length !== 1) {
		throw new Error("Task not created");
	}
	return result[0] as SelectTask;
};

export const updateTask = async (id: string, task: InsertTask) => {
	const result = await db
		.update(tasks)
		.set(task)
		.where(eq(tasks.id, id))
		.returning();
	if (result.length !== 1) {
		throw new Error("Task not updated");
	}
	return result[0] as SelectTask;
};

export const deleteTask = async (id: string) => {
	const result = await db.delete(tasks).where(eq(tasks.id, id)).returning();
	if (result.length !== 1) {
		throw new Error("Task not deleted");
	}
	return result[0] as SelectTask;
};
// end-auto-generated
