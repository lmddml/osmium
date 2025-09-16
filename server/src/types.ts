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
	articleNumber?: string;
	name?: string;
	description?: string;
	price?: number;
	unitId?: string;
};

export type SelectArticle = {
	id: string;
	articleNumber?: string;
	name?: string;
	description?: string;
	price?: number;
	unitId?: string;
};

export type DetailArticle = {
	id: string;
	articleNumber?: string;
	name?: string;
	description?: string;
	price?: number;
	unitId?: string;
	unit?: SelectUnit;
};

// Unit
export type InsertUnit = {
	name?: string;
	description?: string;
};

export type SelectUnit = {
	id: string;
	name?: string;
	description?: string;
};

// Order
export type InsertOrder = {
	orderNumber?: string;
	customerId?: string;
	orderDate?: string;
	totalAmount?: number;
};

export type SelectOrder = {
	id: string;
	orderNumber?: string;
	customerId?: string;
	orderDate?: string;
	totalAmount?: number;
};

export type DetailOrder = {
	id: string;
	orderNumber?: string;
	customerId?: string;
	customer?: SelectCustomer;
	orderDate?: string;
	totalAmount?: number;
};

// OrderItem
export type InsertOrderItem = {
	orderId?: string;
	articleId?: string;
	quantity?: number;
	price?: number;
};

export type SelectOrderItem = {
	id: string;
	orderId?: string;
	articleId?: string;
	quantity?: number;
	price?: number;
};

export type DetailOrderItem = {
	id: string;
	orderId?: string;
	articleId?: string;
	article?: DetailArticle;
	quantity?: number;
	price?: number;
};
