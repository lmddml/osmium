// begin-auto-generated
import type { Response } from "express";
import express from "express";
import type { InsertCustomer, SelectCustomer } from "../types.ts";
import {
	createCustomer,
	deleteCustomer,
	getCustomerById,
	getCustomers,
	updateCustomer,
} from "./customerService.ts";

export const router = express.Router();

router.get("/", async (_req, res: Response<SelectCustomer[]>) => {
	const customers = await getCustomers();
	res.json(customers);
});

router.post("/", async (req, res: Response<SelectCustomer>) => {
	const result: InsertCustomer = req.body;
	const customer = await createCustomer(result);
	res.json(customer);
});

router.get("/:id", async (req, res: Response<SelectCustomer>) => {
	const id = req.params.id;
	const customer = await getCustomerById(id);
	res.json(customer);
});

router.put("/:id", async (req, res: Response<SelectCustomer>) => {
	const id = req.params.id;
	const result: InsertCustomer = req.body;
	const customer = await updateCustomer(id, result);
	res.json(customer);
});

router.delete("/:id", async (req, res: Response<SelectCustomer>) => {
	const id = req.params.id;
	const customer = await deleteCustomer(id);
	res.json(customer);
});
// end-auto-generated
