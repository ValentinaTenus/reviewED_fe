import { Course } from '~/common/types/index';

import { ItemsContainer, ItemsContentWrapperSection, ItemsHeader } from '../index';
import { NewCourseCard } from './components/index';
import styles from './styles.module.scss';

type NewCoursesSectionProperties = {
  courses: Course[];
  screenWidth: number;
};

const NewCoursesSection: React.FC<NewCoursesSectionProperties> = ({
  courses, screenWidth
}) => {

  return (
    <ItemsContainer className={styles['new_courses']} >
      <ItemsHeader 
        header={screenWidth < 768 ? 'Нові курси' : 'Нещодавно додані курси'}
        screenWidth={screenWidth}
      />
      <ItemsContentWrapperSection className={styles['items_section']} >
        {courses.map((course) => (
          <NewCourseCard course={course} key={course.id}/>
        ))}
      </ItemsContentWrapperSection>
  </ItemsContainer>
  )
};

export { NewCoursesSection };