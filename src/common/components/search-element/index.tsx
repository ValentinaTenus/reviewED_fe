import { Button,  } from '~/common/components/index';
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

  const { control, errors } = useAppForm({
    defaultValues: {
      search: '',
    },
  });

  return (
    <div className={styles['container']}>
      <form className={styles['search_form']}>
        <div className={styles['form']}>
          <SearchInput
            className={styles['search__input']}
            placeholder='Введіть запит'
            control={control}
            errors={errors}
            name='search'
            hasVisuallyHiddenLabel
            iconName={IconName.SEARCH}
          />
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
              label='Локації'
              placeholder='Локації'
              name='location'
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
