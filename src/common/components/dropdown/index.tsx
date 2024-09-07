import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

type Option = {
  value: string;
  label: string;
};

type Properties = {
  name: string;
  onChange: (value: string | undefined) => void;
  options: Option[];
  label?: string;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  defaultValue?: Option;
};

const Dropdown: React.FC<Properties> = ({
    onChange,
    className,
    placeholder,
    isDisabled,
    options,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setSelectedValue(newValue);
      setIsOpen(false);
      onChange(newValue);
    },
    [onChange],
  );

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className={clsx(styles['dropdown-container'], { [styles['open']]: isOpen })}>
      <select
        value={selectedValue}
        onChange={handleOptionChange}
        onClick={handleToggleDropdown}
        className={clsx(styles['dropdown'], { [styles['open']]: isOpen }, className)}
        disabled={isDisabled}
      >
        {selectedValue === "" && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  )
};
 
export { Dropdown };
