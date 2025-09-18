// begin-auto-generated
import type { Response } from "express";
import express from "express";
import type { InsertUnit, QueryUnit, SelectUnit } from "../types.ts";
import {
	createUnit,
	deleteUnit,
	getUnitById,
	getUnits,
	updateUnit,
} from "./unitService.ts";

export const router = express.Router();

router.get("/", async (req, res: Response<SelectUnit[]>) => {
	const { page, perPage, id, name, description } = req.query;

	const query: QueryUnit = {
		page: page === undefined ? undefined : parseInt(page as string, 10),
		perPage:
			perPage === undefined ? undefined : parseInt(perPage as string, 10),
		filter: {
			id: typeof id === "string" ? id : undefined,
			name: typeof name === "string" ? name : undefined,
			description: typeof description === "string" ? description : undefined,
		},
	};

	const units = await getUnits(query);
	res.json(units);
});

router.post("/", async (req, res: Response<SelectUnit>) => {
	const result: InsertUnit = req.body;
	const unit = await createUnit(result);
	res.json(unit);
});

router.get("/:id", async (req, res: Response<SelectUnit>) => {
	const id = req.params.id;
	const unit = await getUnitById(id);
	res.json(unit);
});

router.put("/:id", async (req, res: Response<SelectUnit>) => {
	const id = req.params.id;
	const result: InsertUnit = req.body;
	const unit = await updateUnit(id, result);
	res.json(unit);
});

router.delete("/:id", async (req, res: Response<SelectUnit>) => {
	const id = req.params.id;
	const unit = await deleteUnit(id);
	res.json(unit);
});
// end-auto-generated
