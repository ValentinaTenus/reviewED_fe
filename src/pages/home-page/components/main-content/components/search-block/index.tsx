import { FC, useCallback, useState } from 'react';

import { type Company, type Course } from '~/common/types/index';

import { NotFound } from './components/index';
import { SearchElement } from './components/index';
import styles from './styles.module.scss';

const SearchBlock: FC = () => {
  const [searchResult, setSearchResult] = useState<Company[] | Course[]>([]);

  const handleSearch = useCallback((searchResult: Company[] | Course[]) => {
    setSearchResult(searchResult)
  }, []);

  return (
    <div className={styles['search_block']}>
      <SearchElement onSearch={handleSearch}/>
      {searchResult.length === 0 && <NotFound />}
    </div>
  )
};

export { SearchBlock };