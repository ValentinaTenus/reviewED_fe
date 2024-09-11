import { BanerBlock, SearchBlock } from './components/index';
import styles from './styles.module.scss';

const MainContent = () => {

  return (
    <div className={styles['main_content_wrapper']}>
      <div className={styles['main_content']}>
        <BanerBlock />
        <SearchBlock />
      </div>
    </div>
  )
};

export { MainContent };