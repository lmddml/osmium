// begin-auto-generated
import type { InsertOrder, QueryOrder } from "../types.ts";
import * as orderModel from "./orderModel.ts";

export const getOrders = async (query: QueryOrder) => {
	const orders = await orderModel.getOrders(query);
	return orders;
};

export const createOrder = async (order: InsertOrder) => {
	return await orderModel.createOrder(order);
};

export const getOrderById = async (id: string) => {
	const order = await orderModel.getOrderById(id);
	return order;
};

export const updateOrder = async (id: string, order: InsertOrder) => {
	const updatedOrder = await orderModel.updateOrder(id, order);
	return updatedOrder;
};

export const deleteOrder = async (id: string) => {
	const order = await orderModel.deleteOrder(id);
	return order;
};
// end-auto-generated
