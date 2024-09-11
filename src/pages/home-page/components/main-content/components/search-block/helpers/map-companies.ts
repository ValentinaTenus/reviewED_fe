import { type DropdownOption, type Company } from "~/common/types";

const mapCompanies = (companies: Company[]) => {
  const sortedCompanies = [...companies]
  .sort((company1, company2) => +company2.average_rating - +company1.average_rating)
  .map((company) => ({
    value: company.name,
    label: company.name
  }));

  const topCompanies = sortedCompanies.slice(0, 5);
  const otherCompanies = sortedCompanies.slice(5);

  const options: DropdownOption[] = [
    {value: 1, label: 'Топ компанії', options: topCompanies},
    {value: 2, label: 'Інші компанії', options: otherCompanies}
  ];

  return options
}

export { mapCompanies };