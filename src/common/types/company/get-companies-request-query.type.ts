type GetCompaniesRequestQuery = {
	category_by_id?: number[];
	city?: string;
	limit?: number;
	name?: string;
	offset?: number;
	sort?: string;
	subcategory_by_id?: number[];
};

export { type GetCompaniesRequestQuery };
