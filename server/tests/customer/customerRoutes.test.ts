import { deepStrictEqual, ok, strictEqual } from "node:assert";
import test from "node:test";
import { sql } from "drizzle-orm";
import * as customerModel from "../../src/customer/customerModel.ts";
import { db } from "../../src/db/db.ts";
import type { InsertCustomer, SelectCustomer } from "../../src/types.ts";

const createData = async (
	numberOfCustomers: number,
): Promise<SelectCustomer[]> => {
	await db.execute(sql`delete from customers`);
	const insertCustomers: SelectCustomer[] = [];

	for (let i = 0; i < numberOfCustomers; i++) {
		const customer: InsertCustomer = {
			name: "John Doe",
			email: "john.doe@example.com",
			phone: "1234567890",
			street: "123 Main St",
			city: "Anytown",
			postalCode: "12345",
			country: "USA",
			customerNumber: i.toString(),
		};
		const insertedCustomer = await customerModel.createCustomer(customer);
		if (!insertedCustomer) {
			throw new Error("Customer not created");
		}
		insertCustomers.push({ id: insertedCustomer.id, ...customer });
	}

	return insertCustomers;
};

test("GET /customers responds with JSON array and status 200", async () => {
	const newCustomers = await createData(2);
	const response = await fetch("http://localhost:3001/customers");

	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));

	const data = (await response.json()) as SelectCustomer[];
	const _cleanedCustomers = data.map(({ id, ...rest }) => rest);

	deepStrictEqual(data, newCustomers);
});

test("POST /customers responds with JSON and status 200", async () => {
	await createData(0);
	const expectedCustomer: InsertCustomer = {
		name: "John Doe",
		email: "john.doe@example.com",
		phone: "1234567890",
		street: "123 Main St",
		city: "Anytown",
		postalCode: "12345",
		country: "USA",
		customerNumber: "1",
	};
	const response = await fetch("http://localhost:3001/customers", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expectedCustomer),
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const { id: _id, ...actualCustomer } =
		(await response.json()) as SelectCustomer;

	deepStrictEqual(expectedCustomer, actualCustomer);
});

test("GET /customers/:id responds with JSON and status 200", async () => {
	const expectedCustomers = await createData(1);
	strictEqual(expectedCustomers.length, 1);
	const expectedCustomer = expectedCustomers[0] as SelectCustomer;
	const id = expectedCustomer.id;

	const response = await fetch(`http://localhost:3001/customers/${id}`);
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualCustomer = (await response.json()) as SelectCustomer;
	deepStrictEqual(expectedCustomer, actualCustomer);
});

test("PUT /customers/:id responds with JSON and status 200", async () => {
	const expectedCustomers = await createData(1);
	strictEqual(expectedCustomers.length, 1);
	const expectedCustomer = expectedCustomers[0] as SelectCustomer;
	const id = expectedCustomer.id;

	const response = await fetch(`http://localhost:3001/customers/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expectedCustomer),
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualCustomer = (await response.json()) as SelectCustomer;
	deepStrictEqual(expectedCustomer, actualCustomer);
});

test("DELETE /customers/:id responds with JSON and status 200", async () => {
	const expectedCustomers = await createData(1);
	strictEqual(expectedCustomers.length, 1);
	const expectedCustomer = expectedCustomers[0] as SelectCustomer;
	const id = expectedCustomer.id;

	const response = await fetch(`http://localhost:3001/customers/${id}`, {
		method: "DELETE",
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualCustomer = (await response.json()) as SelectCustomer;
	deepStrictEqual(expectedCustomer, actualCustomer);
	const customers = await customerModel.getCustomers();
	strictEqual(customers.length, 0);
});
