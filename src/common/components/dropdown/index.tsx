import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { type DropdownOption } from '~/common/types/index';

import styles from './styles.module.scss';

type Properties = {
  name: string;
  onChange: (value: number | string ) => void;
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
  const [selectedOption, setSelectedOption] = useState<DropdownOption | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedOptions, setExpandedOptions] = useState<DropdownOption | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: DropdownOption) => {
    const { value, label } = option;
    setSelectedOption({ value, label });
    setIsOpen(false);
    onChange(value);
  };

  const handleTitleClick = (option: DropdownOption) => {
    if (option.options && option.options.length > 0) {
      setExpandedOptions(expandedOptions === option ? null : option);
    } else {
      handleOptionClick(option);
    }
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
        className={clsx(styles['dropdown_trigger'], { [styles['open']]: isOpen })}
        onClick={handleToggleDropdown}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
      </div>
      {isOpen && !isDisabled && (
        <div className={styles['dropdown_menu']}>
          <div className={styles['dropdown_menu_content']}>
          {options.map((option, index) => (
            <div key={index}>
              <div 
                className={clsx(styles['dropdown_title'], styles['dropdown_item'])}
                onClick={() => handleTitleClick(option)}
              >
                {option.label}
              </div>
              {option.options?.map((nestedOption, nestedIndex) => (
                <div
                  key={nestedIndex}
                  className={clsx(styles['dropdown_item'], styles['nested_option'])}
                  onClick={() => handleOptionClick(nestedOption)}
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
