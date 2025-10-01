// begin-auto-generated
import { deepStrictEqual, ok, strictEqual } from "node:assert";
import test from "node:test";
import { sql } from "drizzle-orm";
import { db } from "../../src/db/db.ts";
import * as orderModel from "../../src/order/orderModel.ts";
import * as taskModel from "../../src/task/taskModel.ts";
import type { InsertOrder, InsertTask, SelectTask } from "../../src/types.ts";

// begin-auto-generated

const createData = async (numberOfTasks: number): Promise<SelectTask[]> => {
	await db.execute(sql`delete from tasks`);
	await db.execute(sql`delete from orders`);
	const insertTasks: SelectTask[] = [];

	for (let i = 0; i < numberOfTasks; i++) {
		const insertedOrder = await createOrder(i.toString());

		const task = createTestTask(i.toString(), insertedOrder.id);
		const insertedTask = await taskModel.createTask(task);
		if (!insertedTask) {
			throw new Error("Task not created");
		}
		insertTasks.push({ id: insertedTask.id, ...task });
	}

	return insertTasks;
};

const createOrder = async (suffix: string) => {
	const order = createTestOrder(suffix);
	const insertedOrder = await orderModel.createOrder(order);
	if (!insertedOrder) {
		throw new Error("Order not created");
	}
	return insertedOrder;
};

test("GET /tasks responds with JSON array and status 200", async () => {
	const newTasks = await createData(2);
	const response = await fetch("http://localhost:3001/tasks");

	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));

	const data = (await response.json()) as SelectTask[];
	const _cleanedTasks = data.map(({ id, ...rest }) => rest);

	deepStrictEqual(data, newTasks);
});

test("POST /tasks responds with JSON and status 200", async () => {
	await createData(0);
	const insertedOrder = await createOrder("1");
	const expectedTask = createTestTask("1", insertedOrder.id);
	const response = await fetch("http://localhost:3001/tasks", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expectedTask),
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const { id: _id, ...actualTask } = (await response.json()) as SelectTask;

	deepStrictEqual(expectedTask, actualTask);
});

test("GET /tasks/:id responds with JSON and status 200", async () => {
	const expectedTasks = await createData(1);
	strictEqual(expectedTasks.length, 1);
	const expectedTask = expectedTasks[0] as SelectTask;
	const id = expectedTask.id;

	const response = await fetch(`http://localhost:3001/tasks/${id}`);
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualTask = (await response.json()) as SelectTask;
	deepStrictEqual(expectedTask, actualTask);
});

test("PUT /tasks/:id responds with JSON and status 200", async () => {
	const expectedTasks = await createData(1);
	strictEqual(expectedTasks.length, 1);
	const expectedTask = expectedTasks[0] as SelectTask;
	const id = expectedTask.id;

	const response = await fetch(`http://localhost:3001/tasks/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expectedTask),
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualTask = (await response.json()) as SelectTask;
	deepStrictEqual(expectedTask, actualTask);
});

test("DELETE /tasks/:id responds with JSON and status 200", async () => {
	const expectedTasks = await createData(1);
	strictEqual(expectedTasks.length, 1);
	const expectedTask = expectedTasks[0] as SelectTask;
	const id = expectedTask.id;

	const response = await fetch(`http://localhost:3001/tasks/${id}`, {
		method: "DELETE",
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualTask = (await response.json()) as SelectTask;
	deepStrictEqual(expectedTask, actualTask);
	const tasks = await taskModel.getTasks({});
	strictEqual(tasks.length, 0);
});
// end-auto-generated

const createTestTask = (suffix: string, orderId: string): InsertTask => {
	const task: InsertTask = {
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		name: "name",
		orderId: orderId,
		position: 1,
		doneAt: null,
		taskNumber: suffix,
	};
	return task;
};

const createTestOrder = (suffix: string): InsertOrder => {
	const order: InsertOrder = {
		orderNumber: suffix + (Math.random() * 10000000).toFixed(),
		customerId: null,
		orderDate: null,
	};
	return order;
};
