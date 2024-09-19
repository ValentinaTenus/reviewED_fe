import { type DropdownOption } from "~/common/types";

const mapLocations = (locations: string[]): DropdownOption[] => {
	const mappedItems: DropdownOption[] = locations.map((location) => ({
		label: location,
		value: location,
	}));

	return [
		{
			label: "Всі Локації",
			value: "",
		},
		{
			label: "Всі Міста",
			options: mappedItems,
			value: "",
		},
	];
};

export { mapLocations };
