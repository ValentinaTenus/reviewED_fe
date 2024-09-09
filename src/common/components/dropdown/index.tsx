import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.scss';

type Option = {
  value: string;
  label: string;
  children?: Option[];
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
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onChange(value);
  };

  const handleToggleDropdown = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
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
    <div 
      ref={dropdownRef} 
      className={clsx(styles['dropdown_container'], 
      { [styles['open']]: isOpen, [styles['disabled']]: isDisabled }, 
      className)}
    >
      <div
        className={styles['dropdown_trigger']}
        onClick={handleToggleDropdown}
      >
        <span>{placeholder}</span>
      </div>
      {isOpen && !isDisabled && (
        <div className={styles['dropdown_menu']}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles['dropdown_item']}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
