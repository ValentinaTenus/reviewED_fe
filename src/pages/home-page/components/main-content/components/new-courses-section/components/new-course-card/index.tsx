import DefaultCompanyImage from '~/assets/images/default-company-image.png';
import { Rating } from '~/common/components/index';
import { Course } from '~/common/types/index';

import styles from './styles.module.scss';

type CourseCardProperties = {
  course: Course;
};

const NewCourseCard: React.FC<CourseCardProperties> = ({
  course,
}) => {

  return (
    <div key={course.id} className={styles['item_card']}>
      <div  className={styles['item_loco_container']}>
        <img  alt={course.title} className={styles['course_image']} src={DefaultCompanyImage}/>
          <div className={styles['item_rating_container']}>
            <p className={styles['reviews_amount']}>56 відгуків</p>
            <Rating averageRating={course.average_rating}/>
        </div>
      </div>
        <h4 className={styles['item_name']}>{course.title}</h4>
    </div>
  )
};

export { NewCourseCard };