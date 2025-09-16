import { buildApp } from "./app.ts";

const port = Number(process.env.PORT) || 3000;
const app = buildApp();

// Start the server and capture the returned Server instance.
const server = app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});

// Listen for the SIGTERM signal to gracefully shut down the server.
process.on("SIGTERM", () => {
	console.log("SIGTERM signal received: closing HTTP server");
	server.close(() => {
		console.log("HTTP server closed");
	});
});
