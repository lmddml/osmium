import { db } from "../db/db.ts";

type DbQueryMap = typeof db.query;

export type AvailableTable = Extract<keyof DbQueryMap, string>;

export const getAllFromTable = <T extends AvailableTable>(tableName: T) => {
	const query = db.query[tableName];
	return query.findMany();
};
