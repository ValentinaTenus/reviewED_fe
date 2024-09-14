import { type Company, type Course, type DropdownOption } from "~/common/types";

type Parameters = {
	companies?: Company[];
	courses?: Course[];
};

const getDropdownOptionsFormat = (items: Parameters): DropdownOption[] => {
	let mappedItems: DropdownOption[] = [];

	if (items.companies) {
		mappedItems = items.companies.map((company) => ({
			label: company.name,
			value: company.name,
		}));
	}

	if (items.courses) {
		mappedItems = items.courses.map((course) => ({
			label: course.title,
			value: course.title,
		}));
	}

	return mappedItems;
};

export { getDropdownOptionsFormat };
