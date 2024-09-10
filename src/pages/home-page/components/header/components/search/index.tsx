import { Input } from "~/common/components/index";
import { useAppForm } from "~/common/hooks/index";
import { IconName } from "~/common/enums/index";

import styles from './styles.module.scss';

const Search = () => {
  const { control, errors } = useAppForm({
    defaultValues: {
      search: '',
    },
  });

  return (
    <form  className={styles['search']}>
      <Input
        control={control}
        errors={errors}
        iconName={IconName.SEARCH}
        name='search'
        placeholder='Пошук'
        type='text'
        hasVisuallyHiddenLabel={true}
      />
    </form>
  )
}

export { Search };