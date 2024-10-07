type GetQueryResponse<T> = {
	count: number;
	next: null | number;
	previous: null | number;
	results: T[];
	reviews_count?: number;
};

export { type GetQueryResponse };
