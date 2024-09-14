import { type Company } from "./company.type";

type GetCompaniesResponse = {
	count: number;
	next: null | string;
	previous: null | string;
	results: Company[];
};

export { type GetCompaniesResponse };
