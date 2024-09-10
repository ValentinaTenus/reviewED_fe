import { useCallback,useEffect, useState } from 'react';

import { Button } from '~/common/components/index';
import { CITIES } from '~/common/constants/index';
import { useAppForm } from '~/common/hooks/index';
import { ButtonSize, ButtonType, ButtonVariant, IconName } from '~/common/enums/index';
import { DropdownOption } from '~/common/types/index';
import { useGetCompaniesQuery } from '~/redux/companies/companies-api';

import { Dropdown } from '../dropdown';
import { SearchInput } from './components/index';
import { getDropdownOptionsFormat, mapCompanies } from './helpers';
import styles from './styles.module.scss';

const categories = [
  {
    value:'курси',
    label:'Курси'
  },
  {
    value:'компанії',
    label:'Компанії'
  }, 
]

const SearchElement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<DropdownOption[]>([]);
  const [companiesOptions, setCompaniesOptions] = useState<DropdownOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].value)
  
  const { data: companies, refetch: refetchCompanies } = useGetCompaniesQuery(
    { name: searchTerm },
    {
      skip: selectedCategory !== categories[0].value,
      refetchOnMountOrArgChange: true, 
    }
  );

  const { control, errors } = useAppForm({
    defaultValues: {
      search: '',
    },
  });

  useEffect(() => {
    if (companies) {
      const options = mapCompanies(companies);
      setCompaniesOptions(options);
    }
  }, [companies]);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredSuggestions([]);
    } else {
      refetchCompanies();

      if(companies){
        const mappedCompanies = getDropdownOptionsFormat(companies)
        setFilteredSuggestions(mappedCompanies);
      }
    }
  };

  const handleCoursesOrCompaniesChoose = useCallback((value: string | number) => {
    setSelectedCategory(value.toString()); 
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string | number) => {
    setSearchTerm(suggestion.toString()); 
  }, []);

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
              options={categories}
              onChange={handleCoursesOrCompaniesChoose}
            />
          </div>
          <div className={styles['search_dropdown_wrapper']}>
            <Dropdown
              className={styles['search_dropdown']}
              label='Всі Локації'
              placeholder='Всі Локації'
              name='allLocations'
              options={CITIES}
              onChange={(value) => console.log(value)}
            />
          </div>
          <div className={styles['search_dropdown_wrapper']}>
            <Dropdown
              className={styles['search_dropdown']}
              label='Всі компанії'
              placeholder='Всі компанії'
              name='allCompanies'
              options={companiesOptions}
              onChange={(value) => console.log(value)}
            />
          </div>
        </div>
        
        <div className={styles['search_button_wrapper']}>
        <Button
          className={styles['search__button']}
          size={ButtonSize.LARGE}
          type={ButtonType.SUBMIT}
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
