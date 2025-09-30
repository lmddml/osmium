// begin-auto-generated
import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { orders } from "../db/schema.ts";
import type { QueryOrder } from "../types.ts";

export type InsertOrder = typeof orders.$inferInsert;
export type SelectOrder = typeof orders.$inferSelect;

export const getOrders = async ({
	page = 1,
	perPage = 100,
	filter = {},
}: QueryOrder) => {
	const {
		id, // template-id
	} = filter;
	const where = {
		...(id !== undefined && { id }), // template-id
	};
	return db.query.orders.findMany({
		limit: perPage,
		offset: (page - 1) * perPage,
		where,
	});
};

export const getOrderById = async (id: string): Promise<SelectOrder> => {
	const order = await db.query.orders.findFirst({ where: { id } });

	if (!order) {
		throw new Error("Order not found");
	}

	return order;
};

export const createOrder = async (order: InsertOrder) => {
	const result = await db.insert(orders).values(order).returning();
	if (result.length !== 1) {
		throw new Error("Order not created");
	}
	return result[0] as SelectOrder;
};

export const updateOrder = async (id: string, order: InsertOrder) => {
	const result = await db
		.update(orders)
		.set(order)
		.where(eq(orders.id, id))
		.returning();
	if (result.length !== 1) {
		throw new Error("Order not updated");
	}
	return result[0] as SelectOrder;
};

export const deleteOrder = async (id: string) => {
	const result = await db.delete(orders).where(eq(orders.id, id)).returning();
	if (result.length !== 1) {
		throw new Error("Order not deleted");
	}
	return result[0] as SelectOrder;
};
// end-auto-generated
