import { FC } from 'react';

import styles from './styles.module.scss';
import { SearchElement } from './components/index';

const SearchBlock: FC = () => {

  return (
    <div className={styles['search_block']}>
      <SearchElement />
    </div>
  )
};

export { SearchBlock };