import { type DropdownOption } from "~/common/types";

const mapLocations = (locations: string[]): DropdownOption[] => {
	const mappedItems: DropdownOption[] = locations.map((location) => ({
		label: location,
		value: location,
	}));

	return [
		{
			label: "Всі локації",
			value: "",
		},
		{
			label: "Всі міста",
			options: mappedItems,
			value: "",
		},
	];
};

export { mapLocations };
