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

export type QueryCustomer = {
	page?: number | undefined;
	perPage?: number | undefined;
	filter?: {
		id?: string | undefined;
		name?: string | undefined;
		customerNumber?: string | undefined;
		street?: string | undefined;
		city?: string | undefined;
		postalCode?: string | undefined;
		country?: string | undefined;
		email?: string | undefined;
		phone?: string | undefined;
	};
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

export type QueryArticle = {
	page?: number | undefined;
	perPage?: number | undefined;
	filter?: {
		id?: string | undefined;
		articleNumber?: string | undefined;
		name?: string | undefined;
		description?: string | undefined;
		price?: number | undefined;
		unitId?: string | undefined;
	};
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

export type QueryUnit = {
	page?: number | undefined;
	perPage?: number | undefined;
	filter?: {
		id?: string | undefined;
		name?: string | undefined;
		description?: string | undefined;
	};
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

export type QueryOrder = {
	page?: number | undefined;
	perPage?: number | undefined;
	filter?: {
		id?: string | undefined;
		orderNumber?: string | undefined;
		customerId?: string | undefined;
		orderDate?: string | undefined;
	};
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

export type QueryOrderItem = {
	page?: number | undefined;
	perPage?: number | undefined;
	filter?: {
		id?: string | undefined;
		orderId?: string | undefined;
		articleId?: string | undefined;
		quantity?: number | undefined;
		price?: number | undefined;
	};
};
