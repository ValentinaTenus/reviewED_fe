import { FC } from "react";

import { Header, MainContent } from "./components/index";
import { Footer } from "~/common/components";

import styles from './styles.module.scss';

const HomePage: FC = () => {

  return (
    <div className={styles['home_page']}>
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}

export { HomePage }; 