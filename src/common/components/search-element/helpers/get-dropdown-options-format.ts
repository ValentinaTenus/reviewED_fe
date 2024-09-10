import { type DropdownOption, type Company } from "~/common/types";

const getDropdownOptionsFormat = (items: Company[]): DropdownOption[] => {
  const mappedItems = items.map((company) => ({
    value: company.id,
    label: company.name
  }));

  return mappedItems
}

export { getDropdownOptionsFormat };