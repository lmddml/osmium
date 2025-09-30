// begin-auto-generated
import type { Response } from "express";
import express from "express";
import type { InsertOrder, QueryOrder, SelectOrder } from "../types.ts";
import {
	createOrder,
	deleteOrder,
	getOrderById,
	getOrders,
	updateOrder,
} from "./orderService.ts";

export const router = express.Router();

router.get("/", async (req, res: Response<SelectOrder[]>) => {
	const { page, perPage, id, orderNumber, customerId, orderDate } = req.query;

	const query: QueryOrder = {
		page: page === undefined ? undefined : parseInt(page as string, 10),
		perPage:
			perPage === undefined ? undefined : parseInt(perPage as string, 10),
		filter: {
			id: typeof id === "string" ? id : undefined,
			orderNumber: typeof orderNumber === "string" ? orderNumber : undefined,
			customerId: typeof customerId === "string" ? customerId : undefined,
			orderDate:
				typeof orderDate === "string" ? new Date(orderDate) : undefined,
		},
	};

	const orders = await getOrders(query);
	res.json(orders);
});

router.post("/", async (req, res: Response<SelectOrder>) => {
	const result: InsertOrder = req.body;
	const order = await createOrder(result);
	res.json(order);
});

router.get("/:id", async (req, res: Response<SelectOrder>) => {
	const id = req.params.id;
	const order = await getOrderById(id);
	res.json(order);
});

router.put("/:id", async (req, res: Response<SelectOrder>) => {
	const id = req.params.id;
	const result: InsertOrder = req.body;
	const order = await updateOrder(id, result);
	res.json(order);
});

router.delete("/:id", async (req, res: Response<SelectOrder>) => {
	const id = req.params.id;
	const order = await deleteOrder(id);
	res.json(order);
});
// end-auto-generated
