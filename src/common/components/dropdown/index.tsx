import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { type DropdownOption } from '~/common/types/index';

import styles from './styles.module.scss';

type Properties = {
  name: string;
  onChange: (value: string | undefined) => void;
  options: DropdownOption[];
  label?: string;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  defaultValue?: DropdownOption;
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
          <div className={styles['dropdown_menu_content']}>
          <div className={clsx(styles['dropdown_title'], styles['dropdown_item'])}>
            {placeholder}
          </div>
          {options.map((option, index) => (
            <div key={index}>
              <div className={clsx(styles['dropdown_title'], styles['dropdown_item'])}>
                {option.label}
              </div>
              {option.options?.map((nestedOption, nestedIndex) => (
                <div
                  key={nestedIndex}
                  className={clsx(styles['dropdown_item'], styles['nested_option'])}
                  onClick={() => handleOptionClick(nestedOption.value)}
                >
                  {nestedOption.label}
                </div>
              ))}
            </div>
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { Dropdown };
