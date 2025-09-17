// Customer
export type InsertCustomer = {
	customerNumber: string;
	name: string;
	street: string;
	city: string;
	postalCode: string;
	country: string;
	email: string;
	phone: string;
};

export type SelectCustomer = {
	id: string;
	customerNumber: string;
	name: string;
	street: string;
	city: string;
	postalCode: string;
	country: string;
	email: string;
	phone: string;
};

// Article
export type InsertArticle = {
	articleNumber: string;
	name: string;
	description: string;
	price: number | null;
	unitId: string | null;
};

export type SelectArticle = {
	id: string;
	articleNumber: string;
	name: string;
	description: string;
	price: number | null;
	unitId: string | null;
};

export type DetailArticle = {
	id: string;
	articleNumber: string;
	name: string;
	description: string;
	price: number | null;
	unitId: string | null;
	unit: SelectUnit | null;
};

// Unit
export type InsertUnit = {
	name: string;
	description: string;
};

export type SelectUnit = {
	id: string;
	name: string;
	description: string;
};

// Order
export type InsertOrder = {
	orderNumber: string;
	customerId: string | null;
	orderDate: string;
};

export type SelectOrder = {
	id: string;
	orderNumber: string;
	customerId: string | null;
	orderDate: string;
};

export type DetailOrder = {
	id: string;
	orderNumber: string;
	customerId: string | null;
	customer: SelectCustomer | null;
	orderDate: string;
};

// OrderItem
export type InsertOrderItem = {
	orderId: string;
	articleId: string | null;
	quantity: number | null;
	price: number | null;
};

export type SelectOrderItem = {
	id: string;
	orderId: string;
	articleId: string | null;
	quantity: number | null;
	price: number | null;
};

export type DetailOrderItem = {
	id: string;
	orderId: string;
	articleId: string | null;
	article: DetailArticle | null;
	quantity: number | null;
	price: number | null;
};
