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

  return (
    <div className={styles['new_courses']} >
      <ItemsHeader 
        header={screenWidth < 1280 ? 'Нові курси' : 'Нещодавно додані курси'}
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