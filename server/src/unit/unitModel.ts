// begin-auto-generated
import { eq } from "drizzle-orm";
import { db } from "../db/db.ts";
import { units } from "../db/schema.ts";
import type { QueryUnit } from "../types.ts";

export type InsertUnit = typeof units.$inferInsert;
export type SelectUnit = typeof units.$inferSelect;

export const getUnits = async ({
	page = 1,
	perPage = 100,
	filter = {},
}: QueryUnit) => {
	const { id, name, description } = filter;
	const where = {
		...(id !== undefined && { id }),
		...(name !== undefined && { name }),
		...(description !== undefined && { description }),
	};
	return db.query.units.findMany({
		limit: perPage,
		offset: (page - 1) * perPage,
		where,
	});
};

export const getUnitById = async (id: string): Promise<SelectUnit> => {
	const unit = await db.query.units.findFirst({ where: { id } });

	if (!unit) {
		throw new Error("Unit not found");
	}

	return unit;
};

export const createUnit = async (unit: InsertUnit) => {
	const result = await db.insert(units).values(unit).returning();
	if (result.length !== 1) {
		throw new Error("Unit not created");
	}
	return result[0] as SelectUnit;
};

export const updateUnit = async (id: string, unit: InsertUnit) => {
	const result = await db
		.update(units)
		.set(unit)
		.where(eq(units.id, id))
		.returning();
	if (result.length !== 1) {
		throw new Error("Unit not updated");
	}
	return result[0] as SelectUnit;
};

export const deleteUnit = async (id: string) => {
	const result = await db.delete(units).where(eq(units.id, id)).returning();
	if (result.length !== 1) {
		throw new Error("Unit not deleted");
	}
	return result[0] as SelectUnit;
};
// end-auto-generated
