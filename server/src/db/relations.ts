import { defineRelations } from "drizzle-orm";
import * as schema from "./schema.ts";

export const relations = defineRelations(schema, (r) => ({
	orders: {
		customer: r.one.customers({
			from: r.orders.customerId,
			to: r.customers.id,
		}),
		orderItems: r.many.orderItems(),
	},
	orderItems: {
		order: r.one.orders({
			from: r.orderItems.orderId,
			to: r.orders.id,
		}),
		article: r.one.articles({
			from: r.orderItems.articleId,
			to: r.articles.id,
		}),
	},
	articles: {
		orderItems: r.many.orderItems(),
		unit: r.one.units({
			from: r.articles.unitId,
			to: r.units.id,
		}),
	},
	units: {
		articles: r.many.articles({
			from: r.units.id,
			to: r.articles.unitId,
		}),
	},
	hours: {
		order: r.one.orders({
			from: r.hours.orderId,
			to: r.orders.id,
		}),
	},
	tasks: {
		order: r.one.orders({
			from: r.tasks.orderId,
			to: r.orders.id,
		}),
	},
}));
