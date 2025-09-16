import {
	integer,
	numeric,
	pgTable,
	text,
	time,
	timestamp,
	uuid,
	varchar,
} from "drizzle-orm/pg-core";

export const examples = pgTable("examples", {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
});

export const users = pgTable("users", {
	id: integer().primaryKey(),
	name: text().notNull(),
});

export const posts = pgTable("posts", {
	id: integer().primaryKey(),
	content: text().notNull(),
	ownerId: integer("owner_id"),
});

export const customers = pgTable("customers", {
	id: uuid().primaryKey().defaultRandom(),
	customerNumber: varchar("customer_number", { length: 255 })
		.notNull()
		.unique(),
	name: varchar({ length: 255 }).notNull(),
	street: varchar({ length: 255 }).notNull(),
	city: varchar({ length: 255 }).notNull(),
	postalCode: varchar({ length: 255 }).notNull(),
	country: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 255 }).notNull(),
});

export const articles = pgTable("articles", {
	id: uuid().primaryKey().defaultRandom(),
	articleNumber: varchar("article_number", { length: 255 }).notNull().unique(),
	name: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	price: varchar({ length: 255 }).notNull(),
	unitId: uuid("unit_id").references(() => units.id),
});

export const units = pgTable("units", {
	id: uuid().primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull().unique(),
	description: varchar({ length: 255 }).notNull().unique(),
});

export const orders = pgTable("orders", {
	id: uuid().primaryKey().defaultRandom(),
	orderNumber: varchar("order_number", { length: 255 }).notNull().unique(),
	customerId: uuid("customer_id").references(() => customers.id),
	orderDate: timestamp({ withTimezone: true }),
	totalAmount: numeric().notNull(),
});

export const orderItems = pgTable("order_items", {
	id: uuid().primaryKey().defaultRandom(),
	orderId: uuid("order_id").references(() => orders.id),
	articleId: uuid("article_id").references(() => articles.id),
	quantity: numeric().notNull(),
	price: numeric().notNull(),
});

export const hours = pgTable("hours", {
	id: uuid().primaryKey().defaultRandom(),
	orderId: uuid("order_id").references(() => orders.id),
	start: time({ withTimezone: true }),
	end: time({ withTimezone: true }),
	duration: integer(),
});

export const tasks = pgTable("tasks", {
	id: uuid().primaryKey().defaultRandom(),
	orderId: uuid("order_id").references(() => orders.id),
	description: varchar({ length: 255 }).notNull(),
});
