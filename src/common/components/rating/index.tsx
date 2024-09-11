import React from 'react';

import StarIcon from '~/assets/images/star.svg?react';
import HalfFilledStar from '~/assets/images/half-filled-star.svg?react';

import styles from './styles.module.scss';

type RatingProperties = {
  averageRating: number; 
};

const Rating: React.FC<RatingProperties> = ({ averageRating }) => {
  const totalStars = 5;
  
  return (
    <div className={styles['rating']}>
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1; 

        return (
          <span key={index} className={styles['star']}>
            {averageRating >= ratingValue ? (
              <StarIcon />
            ) : averageRating >= ratingValue - 0.5 ? (
              <HalfFilledStar className={styles['star_half_filled']}/>
            ) : (
              <StarIcon className={styles['star_empty']}/>
            )}
          </span>
        );
      })}
      <span className={styles['average_rating']}>{`(${averageRating})`}</span>
    </div>
  );
};

export { Rating };
