import { FC } from 'react';

import { Icon } from '~/common/components/index';
import { IconName } from '~/common/enums/index';

import styles from './styles.module.scss';

const TechContactsBlock: FC = () => {
  
  return (
    <div className={styles['footer_content__contacts']}>
      <p className={styles['footer_content__contacts_title']}>
        Контакти технічної підтримки
      </p>
      <div className={styles['footer_content__contacts_data']}>
        <div className={styles['footer_content__contacts']}>
          <div className={styles['footer_content__contact']}> 
            <Icon name={IconName.PHONE}/>{' '}
            <span>+380674646575</span>
          </div>
          <div className={styles['footer_content__contact']}> 
            <Icon name={IconName.EMAIL}/>{' '}
            <span>reviewED@gmail.com </span>
          </div>
        </div>
      </div>
    </div>     
  )
}

export { TechContactsBlock };