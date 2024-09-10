import { useCallback,useEffect, useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

import { Button, Dropdown } from '~/common/components/index';
import { CITIES } from '~/common/constants/index';
import { useAppForm } from '~/common/hooks/index';
import { ButtonSize, ButtonType, ButtonVariant, IconName } from '~/common/enums/index';
import { DropdownOption } from '~/common/types/index';
import { useGetCompaniesQuery } from '~/redux/companies/companies-api';
import { useGetCoursesQuery } from '~/redux/courses/courses-api';

import { getDropdownOptionsFormat, mapCompanies, mapCourses } from '../../helpers/index';
import { NotFound } from '../not-found';
import { SearchInput } from './components/search-input';
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
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].value);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [serverError, setServerError] = useState('');
  
  const { data: companies, refetch: refetchCompanies } = useGetCompaniesQuery(
    { name: searchTerm, city: selectedLocation },
    {
      skip: selectedCategory !== categories[0].value,
      refetchOnMountOrArgChange: true, 
    }
  );

  const { data: courses, refetch: refetchCourses } = useGetCoursesQuery(
    { title: searchTerm, city: selectedLocation },
    {
      skip: selectedCategory !== categories[1].value, 
      refetchOnMountOrArgChange: true,
    }
  );

  const { control, errors, handleSubmit } = useAppForm({
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

  useEffect(() => {
    if (courses) {
      const options = mapCourses(courses);
      setCompaniesOptions(options);
    }
  }, [courses]);

  const handleInputChange = (value: string) => {
    setSearchTerm(value);

    if (value.trim() === '') {
      setFilteredSuggestions([]);
    } else {

      if(selectedCategory === categories[0].value && companies){
        const mappedCompanies = getDropdownOptionsFormat({ companies: companies })
        setFilteredSuggestions(mappedCompanies);
      }

      if(selectedCategory === categories[1].value && courses){
        const mappedCourses = getDropdownOptionsFormat({ courses: courses })
        setFilteredSuggestions(mappedCourses);
      }
    }
  };

  const handleSelectCategory = useCallback((value: string | number) => {
    setSelectedCategory(value.toString()); 
  }, []);

  const handleSelectLocation = useCallback((value: string | number) => {
    setSelectedLocation(value.toString()); 
  }, []);

  const handleSuggestionClick = useCallback((suggestion: string | number) => {
    setSearchTerm(suggestion.toString()); 
  }, []);

	const handleFormChange = useCallback(
		async (): Promise<void> => {
			try {
        if (selectedCategory === categories[0].value) {
          refetchCompanies().unwrap();
        } else {
          refetchCourses().unwrap();
        }
			} catch (error) {
				const loadError = (error as FetchBaseQueryError).data
					? ((error as FetchBaseQueryError).data as Error)
					: { message: 'Невідома помилка'};
				setServerError(loadError.message);
			}
		},
		[refetchCompanies, refetchCourses, selectedCategory],
	);

	const handleFormSubmit = useCallback(
		(event_: React.BaseSyntheticEvent): void => {
			event_.preventDefault();
			void handleSubmit(handleFormChange)(event_);
		},
		[ handleFormChange, handleSubmit])

  return (
    <div>
      <div className={styles['container']}>
        <form className={styles['search_form']} onSubmit={handleFormSubmit}>
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
                onChange={handleSelectCategory}
              />
            </div>
            <div className={styles['search_dropdown_wrapper']}>
              <Dropdown
                className={styles['search_dropdown']}
                label='Всі Локації'
                placeholder='Всі Локації'
                name='allLocations'
                options={CITIES}
                onChange={handleSelectLocation}
              />
            </div>
            <div className={styles['search_dropdown_wrapper']}>
              <Dropdown
                className={styles['search_dropdown']}
                label='Всі компанії'
                placeholder='Всі компанії'
                name='allCompanies'
                options={companiesOptions}
                onChange={() => {}}
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
      {serverError && (
				<p>{serverError}</p>
			)}
      <NotFound />
    </div>
  );
};

export { SearchElement };
