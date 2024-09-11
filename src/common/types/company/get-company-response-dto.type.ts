import { type Company } from "./company.type";

type GetCompaniesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Company[];
};

export { type GetCompaniesResponse };
