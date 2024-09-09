import { useState } from 'react';

import { Button } from '~/common/components/index';
import { useAppForm } from '~/common/hooks/index';
import { ButtonSize, ButtonVariant, IconName } from '~/common/enums/index';

import { Dropdown } from '../dropdown';
import { SearchInput } from './components/index';
import styles from './styles.module.scss';

const mockCompanies = [
  {
    value:'FirstCompany',
    label:'FirstCompany'
  },
  {
    value:'SecondCompany',
    label:'SecondCompany'
  }, 
  {
    value:'LastCompany',
    label:'LastCompany'
  }
]

const SearchElement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const { control, errors } = useAppForm({
    defaultValues: {
      search: '',
    },
  });

  const handleInputChange = (value: string) => {
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const filteredSuggestions = mockCompanies
        .filter((option) =>
          option.label.toLowerCase().includes(value.toLowerCase())
        )
        .map((option) => option.label);
  
      setFilteredSuggestions(filteredSuggestions);
    }

  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion); 
  };

  return (
    <div className={styles['container']}>
      <form className={styles['search_form']}>
        <div className={styles['form']}>
          <div className={styles['search_wrapper']}>
          <SearchInput
            className={styles['search__input']}
            placeholder='Введіть запит'
            control={control}
            errors={errors}
            name='search'            
            iconName={IconName.SEARCH}
            suggestions={filteredSuggestions} 
            onSuggestionClick={handleSuggestionClick} 
            onChange={handleInputChange}
          />
          </div>
          <div className={styles['search_dropdown_wrapper']}>
            <Dropdown
              className={styles['search_dropdown']}
              label='Компанії'
              placeholder="Компанії"
              name='companies'
              options={mockCompanies}
              onChange={(value) => console.log(value)}
            />
          </div>
          <div className={styles['search_dropdown_wrapper']}>
            <Dropdown
              className={styles['search_dropdown']}
              label='Всі Локації'
              placeholder='Всі Локації'
              name='allLocations'
              options={mockCompanies}
              onChange={(value) => console.log(value)}
            />
          </div>
          <div className={styles['search_dropdown_wrapper']}>
            <Dropdown
              className={styles['search_dropdown']}
              label='Всі компанії'
              placeholder='Всі компанії'
              name='allCompanies'
              options={mockCompanies}
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        
        <div className={styles['search_button_wrapper']}>
        <Button
          className={styles['search__button']}
          size={ButtonSize.LARGE}
          variant={ButtonVariant.PRIMARY}
        >
          Знайти
        </Button>
      </div>
      </form>
    </div>
  );
};

export { SearchElement };
