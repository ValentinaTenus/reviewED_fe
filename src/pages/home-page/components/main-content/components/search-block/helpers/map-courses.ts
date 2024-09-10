import { type DropdownOption, type Course } from "~/common/types/index";

const mapCourses = (courses: Course[]): DropdownOption[] => {
  const categoryMap: { [key: string]: DropdownOption['options'] } = {};

  courses.forEach((course) => {
    const categoryName = course.category;
    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = []; 
    }

    categoryMap[categoryName].push({
      value: course.id,
      label: course.title
    });
  });

  const options: DropdownOption[] = Object.keys(categoryMap).map((categoryName, index) => ({
    value: index + 1, 
    label: categoryName,
    options: categoryMap[categoryName], 
  }));

  return options;
};

export { mapCourses };
