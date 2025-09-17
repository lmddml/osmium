// begin-auto-generated
import type { Response } from "express";
import express from "express";
import type { InsertUnit, SelectUnit } from "../types.ts";
import {
	createUnit,
	deleteUnit,
	getUnitById,
	getUnits,
	updateUnit,
} from "./unitService.ts";

export const router = express.Router();

router.get("/", async (_req, res: Response<SelectUnit[]>) => {
	const units = await getUnits();
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
