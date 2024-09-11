import { SearchElement } from '~/common/components';

import { BanerBlock, TopCompanies } from './components/index';
import styles from './styles.module.scss';

const MainContent = () => {

  return (
    <div className={styles['main_content_wrapper']}>
      <div className={styles['main_content']}>
        <BanerBlock />
        <SearchElement />
        <TopCompanies />
      </div>
    </div>
  )
};

export { MainContent };