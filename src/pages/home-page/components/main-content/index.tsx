import { BanerBlock } from './components/index';
import styles from './styles.module.scss';

const MainContent = () => {

  return (
    <div className={styles['main_content_wrapper']}>
      <div className={styles['main_content']}>
        <BanerBlock />
      </div>
    </div>
  )
};

export { MainContent };