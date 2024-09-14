import React from "react";

import { MainContent } from "./components/index";
import { Header, Footer } from "~/common/components/index";

import styles from './styles.module.scss';

const HomePage: React.FC = () => {

  return (
    <div className={styles['home_page']}>
      <Header />
      <MainContent />
      <Footer />
    </div>
  )
}

export { HomePage }; 