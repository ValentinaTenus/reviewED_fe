import { type Category, type DropdownOption } from "~/common/types/index";

const mapCoursesCategories = (categories: Category[]): DropdownOption[] => {
	const options: DropdownOption[] = categories.map((category) => ({
		label: category.name,
		options: category.subcategories.map((subcategory) => ({
			label: subcategory.name,
			value: subcategory.id,
		})),
		value: category.id,
	}));

	return [
		{
			label: "Всі види курсів",
			value: "",
		},
		...options,
	];
};

export { mapCoursesCategories };
