// begin-auto-generated
import type { Response } from "express";
import express from "express";
import type {
	InsertCustomer,
	QueryCustomer,
	SelectCustomer,
} from "../types.ts";
import {
	createCustomer,
	deleteCustomer,
	getCustomerById,
	getCustomers,
	updateCustomer,
} from "./customerService.ts";

export const router = express.Router();

router.get("/", async (req, res: Response<SelectCustomer[]>) => {
	const {
		page,
		perPage,
		id,
		name,
		customerNumber,
		street,
		city,
		postalCode,
		country,
		email,
		phone,
	} = req.query;

	const query: QueryCustomer = {
		page: page === undefined ? undefined : parseInt(page as string, 10),
		perPage:
			perPage === undefined ? undefined : parseInt(perPage as string, 10),
		filter: {
			id: typeof id === "string" ? id : undefined,
			name: typeof name === "string" ? name : undefined,
			customerNumber:
				typeof customerNumber === "string" ? customerNumber : undefined,
			street: typeof street === "string" ? street : undefined,
			city: typeof city === "string" ? city : undefined,
			postalCode: typeof postalCode === "string" ? postalCode : undefined,
			country: typeof country === "string" ? country : undefined,
			email: typeof email === "string" ? email : undefined,
			phone: typeof phone === "string" ? phone : undefined,
		},
	};

	const customers = await getCustomers(query);
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
