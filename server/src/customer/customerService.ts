import type { InsertCustomer } from "./customerModel.ts";
import * as customerModel from "./customerModel.ts";

export const getCustomers = async () => {
	return await customerModel.getCustomers();
};

export const createCustomer = async (customer: InsertCustomer) => {
	return await customerModel.createCustomer(customer);
};

export const getCustomerById = async (id: string) => {
	return await customerModel.getCustomerById(id);
};

export const updateCustomer = async (id: string, customer: InsertCustomer) => {
	return await customerModel.updateCustomer(id, customer);
};

export const deleteCustomer = async (id: string) => {
	return await customerModel.deleteCustomer(id);
};
