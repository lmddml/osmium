// begin-auto-generated
import { deepStrictEqual, ok, strictEqual } from "node:assert";
import test from "node:test";
import { sql } from "drizzle-orm";
import * as unitModel from "../../src/unit/unitModel.ts";
import { db } from "../../src/db/db.ts";
import type { InsertUnit, SelectUnit } from "../../src/types.ts";

const createData = async (
	numberOfUnits: number,
): Promise<SelectUnit[]> => {
	await db.execute(sql`delete from units`);
	const insertUnits: SelectUnit[] = [];

	for (let i = 0; i < numberOfUnits; i++) {
		const unit = createTestUnit(i.toString());
		const insertedUnit = await unitModel.createUnit(unit);
		if (!insertedUnit) {
			throw new Error("Unit not created");
		}
		insertUnits.push({ id: insertedUnit.id, ...unit });
	}

	return insertUnits;
};

test("GET /units responds with JSON array and status 200", async () => {
	const newUnits = await createData(2);
	const response = await fetch("http://localhost:3001/units");

	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));

	const data = (await response.json()) as SelectUnit[];
	const _cleanedUnits = data.map(({ id, ...rest }) => rest);

	deepStrictEqual(data, newUnits);
});

test("POST /units responds with JSON and status 200", async () => {
	await createData(0);
	const expectedUnit = createTestUnit("1");
	const response = await fetch("http://localhost:3001/units", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expectedUnit),
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const { id: _id, ...actualUnit } =
		(await response.json()) as SelectUnit;

	deepStrictEqual(expectedUnit, actualUnit);
});

test("GET /units/:id responds with JSON and status 200", async () => {
	const expectedUnits = await createData(1);
	strictEqual(expectedUnits.length, 1);
	const expectedUnit = expectedUnits[0] as SelectUnit;
	const id = expectedUnit.id;

	const response = await fetch(`http://localhost:3001/units/${id}`);
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualUnit = (await response.json()) as SelectUnit;
	deepStrictEqual(expectedUnit, actualUnit);
});

test("PUT /units/:id responds with JSON and status 200", async () => {
	const expectedUnits = await createData(1);
	strictEqual(expectedUnits.length, 1);
	const expectedUnit = expectedUnits[0] as SelectUnit;
	const id = expectedUnit.id;

	const response = await fetch(`http://localhost:3001/units/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(expectedUnit),
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualUnit = (await response.json()) as SelectUnit;
	deepStrictEqual(expectedUnit, actualUnit);
});

test("DELETE /units/:id responds with JSON and status 200", async () => {
	const expectedUnits = await createData(1);
	strictEqual(expectedUnits.length, 1);
	const expectedUnit = expectedUnits[0] as SelectUnit;
	const id = expectedUnit.id;

	const response = await fetch(`http://localhost:3001/units/${id}`, {
		method: "DELETE",
	});
	strictEqual(response.status, 200);
	ok(response.headers.get("content-type")?.includes("application/json"));
	const actualUnit = (await response.json()) as SelectUnit;
	deepStrictEqual(expectedUnit, actualUnit);
	const units = await unitModel.getUnits();
	strictEqual(units.length, 0);
});
// end-auto-generated

const createTestUnit = (suffix: string): InsertUnit => {
	const unit: InsertUnit = {
		name: `Test Unit ${suffix}`,
		description: `This is a test unit ${suffix}`,
	};
	return unit;
};
