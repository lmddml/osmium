import { Pool } from "pg";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations.ts";

const pool = new Pool({
	connectionString:
		process.env.DATABASE_URL ||
		"postgres://postgres:example@localhost:5432/postgres",
	allowExitOnIdle: true,
});

export const db = drizzle(pool, {
	relations,
	// schema: { customers, orders, tasks },
});
