type Subcategory = {
	id: number;
	name: string;
};

type Category = {
	id: number;
	name: string;
	subcategories: Subcategory[];
};

export { type Category, type Subcategory };
