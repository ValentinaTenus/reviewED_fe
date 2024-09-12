import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '~/common/enums/index';
import { Course } from '~/common/types/index';

import { CourseCard, ItemsContentWrapperSection, ItemsHeader } from '../index';
import styles from './styles.module.scss';

type NewCoursesSectionProperties = {
  courses: Course[];
  screenWidth: number;
};

const NewCoursesSection: React.FC<NewCoursesSectionProperties> = ({
  courses, screenWidth
}) => {
  const navigate = useNavigate();

  const handleSeeAllClick = useCallback(() => {
    navigate(AppRoute.NEW_COURSES)
  }, []);

  return (
    <div className={styles['new_courses']} >
      <ItemsHeader 
        header={screenWidth < 1280 ? 'Нові курси' : 'Нещодавно додані курси'}
        onClick={handleSeeAllClick}
        screenWidth={screenWidth}
      />
      <ItemsContentWrapperSection className={styles['items_section']} >
        {courses.map((course) => (
          <CourseCard course={course} key={course.id}/>
        ))}
      </ItemsContentWrapperSection>
  </div>
  )
};

export { NewCoursesSection };