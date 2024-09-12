import { Course } from '~/common/types/index';

import { CourseCard, ItemsContainer, ItemsContentWrapperSection, ItemsHeader } from '../index';
import styles from './styles.module.scss';

type TopCoursesSectionProperties = {
  courses: Course[];
  screenWidth: number;
};

const TopCoursesSection: React.FC<TopCoursesSectionProperties> = ({
  courses, screenWidth
}) => {

  return (
    <ItemsContainer >
      <ItemsHeader header='TOP Курси' screenWidth={screenWidth}/>
      <ItemsContentWrapperSection className={styles['items_section']}>
        {courses.map((course) => (
          <CourseCard  className={styles['item_card']} course={course} key={course.id}/>
        ))}
      </ItemsContentWrapperSection>
    </ItemsContainer>
  )
};

export { TopCoursesSection };