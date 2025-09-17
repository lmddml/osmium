// begin-auto-generated
import type { InsertUnit } from "./unitModel.ts";
import * as unitModel from "./unitModel.ts";

export const getUnits = async () => {
	return await unitModel.getUnits();
};

export const createUnit = async (unit: InsertUnit) => {
	return await unitModel.createUnit(unit);
};

export const getUnitById = async (id: string) => {
	return await unitModel.getUnitById(id);
};

export const updateUnit = async (id: string, unit: InsertUnit) => {
	return await unitModel.updateUnit(id, unit);
};

export const deleteUnit = async (id: string) => {
	return await unitModel.deleteUnit(id);
};
// end-auto-generated
