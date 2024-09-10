import { type DropdownOption, type Company, type Course } from "~/common/types";

type Parameters = {
  companies?: Company[], 
  courses?: Course[]
}

const getDropdownOptionsFormat= (items: Parameters): DropdownOption[] => {
  let mappedItems: DropdownOption[] = [];

  if(items.companies) {
    mappedItems = items.companies.map((company) => ({
      value: company.name,
      label: company.name
    }));
  }

  if(items.courses) {
    mappedItems = items.courses.map((course) => ({
      value: course.title,
      label: course.title
    }));
  }

  return mappedItems;
}

export { getDropdownOptionsFormat };