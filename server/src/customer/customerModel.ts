import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { customers } from "../db/schema.ts";

export type InsertCustomer = typeof customers.$inferInsert;
export type SelectCustomer = typeof customers.$inferSelect;

export const getCustomers = async () => {
	const result = await db.query.customers.findMany();
	return result;
};

export const getCustomerById = async (id: string) => {
	const result = await db.query.customers.findFirst({
		where: { id },
	});

	if (!result) {
		throw new Error("Customer not found");
	}
	return result;
};

export const createCustomer = async (customer: InsertCustomer) => {
	const result = await db.insert(customers).values(customer).returning();
	if (result.length !== 1) {
		throw new Error("Customer not created");
	}
	return result[0];
};

export const updateCustomer = async (id: string, customer: InsertCustomer) => {
	const result = await db
		.update(customers)
		.set(customer)
		.where(eq(customers.id, id))
		.returning();
	if (result.length !== 1) {
		throw new Error("Customer not updated");
	}
	return result[0];
};

export const deleteCustomer = async (id: string) => {
	const result = await db
		.delete(customers)
		.where(eq(customers.id, id))
		.returning();
	if (result.length !== 1) {
		throw new Error("Customer not deleted");
	}
	return result[0];
};
