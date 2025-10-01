// begin-auto-generated
import { deepStrictEqual, ok, strictEqual } from "node:assert";
import test from "node:test";
import { sql } from "drizzle-orm";
import { db } from "../../src/db/db.ts";
import * as orderModel from "../../src/order/orderModel.ts";
import type { InsertOrder, SelectOrder } from "../../src/types.ts";

const createData = async (numberOfOrders: number): Promise<SelectOrder[]> => {
	await db.execute(sql`delete from tasks`);
	await db.execute(sql`delete from orders`);
	const insertOrders: SelectOrder[] = [];

	for (let i = 0; i < numberOfOrders; i++) {
		const order = createTestOrder(i.toString());
		const insertedOrder = await orderModel.createOrder(order);
		if (!insertedOrder) {
			throw new Error("Order not created");
		}
		insertOrders.push({ id: insertedOrder.id, ...order });
	}

	return insertOrders;
};

test("GET /orders responds with JSON array and status 200", async () => {
	const newOrders = await createData(2);
	const response = await fetch("http://localhost:3001/orders");

	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));

	const data = (await response.json()) as SelectOrder[];
	const _cleanedOrders = data.map(({ id, ...rest }) => rest);

	deepStrictEqual(data, newOrders);
});

test("POST /orders responds with JSON and status 200", async () => {
	await createData(0);
	const expectedOrder = createTestOrder("1");
	const response = await fetch("http://localhost:3001/orders", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expectedOrder),
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const { id: _id, ...actualOrder } = (await response.json()) as SelectOrder;

	deepStrictEqual(expectedOrder, actualOrder);
});

test("GET /orders/:id responds with JSON and status 200", async () => {
	const expectedOrders = await createData(1);
	strictEqual(expectedOrders.length, 1);
	const expectedOrder = expectedOrders[0] as SelectOrder;
	const id = expectedOrder.id;

	const response = await fetch(`http://localhost:3001/orders/${id}`);
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualOrder = (await response.json()) as SelectOrder;
	deepStrictEqual(expectedOrder, actualOrder);
});

test("PUT /orders/:id responds with JSON and status 200", async () => {
	const expectedOrders = await createData(1);
	strictEqual(expectedOrders.length, 1);
	const expectedOrder = expectedOrders[0] as SelectOrder;
	const id = expectedOrder.id;

	const response = await fetch(`http://localhost:3001/orders/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expectedOrder),
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualOrder = (await response.json()) as SelectOrder;
	deepStrictEqual(expectedOrder, actualOrder);
});

test("DELETE /orders/:id responds with JSON and status 200", async () => {
	const expectedOrders = await createData(1);
	strictEqual(expectedOrders.length, 1);
	const expectedOrder = expectedOrders[0] as SelectOrder;
	const id = expectedOrder.id;

	const response = await fetch(`http://localhost:3001/orders/${id}`, {
		method: "DELETE",
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualOrder = (await response.json()) as SelectOrder;
	deepStrictEqual(expectedOrder, actualOrder);
	const orders = await orderModel.getOrders({});
	strictEqual(orders.length, 0);
});
// end-auto-generated

const createTestOrder = (suffix: string): InsertOrder => {
	const order: InsertOrder = {
		orderNumber: suffix,
		customerId: null,
		orderDate: null,
	};
	return order;
};
