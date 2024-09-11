type DropdownOption = {
  value: number  | string;
  label: string;
  options?: DropdownOption[];
};

export { type DropdownOption };