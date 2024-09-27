type GetCoursesRequestQuery = {
	category_by_id?: string[];
	city?: string[];
	company_id?: string;
	limit?: number;
	offset?: number;
	sort?: string;
	subcategory_by_id?: string[];
	title?: string;
};

export { type GetCoursesRequestQuery };
