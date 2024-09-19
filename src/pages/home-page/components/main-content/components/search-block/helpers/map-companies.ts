import { type Company, type DropdownOption } from "~/common/types";

const INDEX_ZERO = 0;
const NUMBER_TOP_COMPANIES = 5;

const mapCompanies = (companies: Company[]) => {
	const sortedCompanies = [...companies]
		.sort(
			(company1, company2) =>
				+company2.avg_overall_rating - +company1.avg_overall_rating,
		)
		.map((company) => ({
			label: company.name,
			value: company.name,
		}));

	const topCompanies = sortedCompanies.slice(INDEX_ZERO, NUMBER_TOP_COMPANIES);
	const otherCompanies = sortedCompanies.slice(NUMBER_TOP_COMPANIES);

	const options: DropdownOption[] = [
		{ label: "Всі компанії", value: "" },
		{ label: "Топ компанії", options: topCompanies, value: "" },
		{ label: "Інші компанії", options: otherCompanies, value: "" },
	];

	return options;
};

export { mapCompanies };
