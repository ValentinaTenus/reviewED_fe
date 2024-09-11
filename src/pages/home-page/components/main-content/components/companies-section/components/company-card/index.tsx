import DefaultCompanyImage from '~/assets/images/default-company-image.png';
import { Rating } from '~/common/components/index';
import { Company } from '~/common/types/index';

import styles from './styles.module.scss';

type CompanyCardProperties = {
  company: Company;
};

const CompanyCard: React.FC<CompanyCardProperties> = ({
  company,
}) => {

  return (
    <div key={company.id} className={styles['item_card']}>
      <div className={styles['item_rating_container']}>
        <p className={styles['reviews_amount']}>56 відгуків</p>
        <Rating averageRating={company.average_rating}/>
      </div>
      <div className={styles['item_logo_container']}>
        <img  alt={company.name} className={styles['company_logo']} src={DefaultCompanyImage}/>
        <h4 className={styles['item_name']}>{company.name}</h4>
      </div>
    </div>
  )
};

export { CompanyCard };