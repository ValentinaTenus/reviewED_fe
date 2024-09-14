import { type Course, type DropdownOption } from "~/common/types/index";

const INCREMENT_INDEX = 1;

const mapCourses = (courses: Course[]): DropdownOption[] => {
	const categoryMap: { [key: string]: DropdownOption["options"] } = {};

	courses.forEach((course) => {
		const categoryName = course.category;
		if (!categoryMap[categoryName]) {
			categoryMap[categoryName] = [];
		}

		categoryMap[categoryName].push({
			label: course.title,
			value: course.title,
		});
	});

	const options: DropdownOption[] = Object.keys(categoryMap).map(
		(categoryName, index) => ({
			label: categoryName,
			options: categoryMap[categoryName],
			value: index + INCREMENT_INDEX,
		}),
	);

  return [
    {
      value: '', 
      label: 'Всі види курсів',
    },
    ...options
  ];
};

export { mapCourses };
