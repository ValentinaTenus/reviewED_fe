type GetQueryResponse<T> = {
	count: number;
	next: null | number;
	previous: null | number;
	results: T[];
};

export { type GetQueryResponse };
