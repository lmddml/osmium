import type { Server } from "node:net";
import { buildApp } from "../src/app.ts";
import { db } from "../src/db/db.ts";

let server: Server;

export async function globalSetup() {
	const app = buildApp();
	server = app.listen(3001);
	//console.log("Global setup executed");
}

export async function globalTeardown() {
//	await db.$client.end();
	server.close();
	//console.log("Global teardown executed");
}
