import { useEffect, useState } from 'react';

import { useGetCompaniesQuery } from '~/redux/companies/companies-api';
import { useGetCoursesQuery } from '~/redux/courses/courses-api';

import { 
  BanerBlock, 
  CompaniesSection, 
  NewCoursesSection,
  SearchBlock,
  TopCoursesSection
} from './components/index';
import styles from './styles.module.scss';

const MainContent: React.FC = () => {
  const { data: companies } = useGetCompaniesQuery({});
  const { data: courses } = useGetCoursesQuery({});

  const [visibleItems, setVisibleItems] = useState(8);
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const updateVisibleItems = () => {
    const screenWidth = window.innerWidth;
    setScreenWidth(screenWidth);

    if (screenWidth <= 480) {
      setVisibleItems(3);
    } else if (screenWidth <= 768){
      setVisibleItems(4);
    } else if (screenWidth <= 1280) {
      setVisibleItems(6); 
    } else {
      setVisibleItems(8); 
    }
  };

  useEffect(() => {
    updateVisibleItems(); 
    window.addEventListener('resize', updateVisibleItems);

    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  return (
    <div className={styles['main_content_wrapper']}>
      <div className={styles['main_content']}>
        <BanerBlock />
        <SearchBlock />
          <CompaniesSection 
            companies={companies ? companies.slice(0, visibleItems) : []} 
            screenWidth={screenWidth}
          />
          <NewCoursesSection 
            courses={courses ? courses.slice(0, visibleItems) : []}
            screenWidth={screenWidth}
          />
          <TopCoursesSection 
            courses={courses ? courses.slice(0, visibleItems) : []}
            screenWidth={screenWidth}
          />
      </div>
    </div>
  )
};

export { MainContent };