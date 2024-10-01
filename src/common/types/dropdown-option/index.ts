type DropdownOption = {
	label: string;
	options?: DropdownOption[];
	value:
		| "-time_added"
		| "approved"
		| "pending"
		| "rejected"
		| "time_added"
		| number
		| string;
};

export { type DropdownOption };
