import { SearchElement } from '~/common/components';
import { BanerBlock } from './components/index';
import styles from './styles.module.scss';

const MainContent = () => {

  return (
    <div className={styles['main_content_wrapper']}>
      <div className={styles['main_content']}>
        <BanerBlock />
        <SearchElement />
      </div>
    </div>
  )
};

export { MainContent };