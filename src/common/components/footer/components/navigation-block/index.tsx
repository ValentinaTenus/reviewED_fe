import { FC } from 'react';
import { Link } from 'react-router-dom';

import { type FooterNavigationLink } from '~/common/types/index';
import styles from './styles.module.scss';

type NavigationBlockProperties = {
  header: string;
  links: FooterNavigationLink[];
}

const NavigationBlock: FC<NavigationBlockProperties> = ({
  header, links
}) => {
  
  return (
    <div className={styles['footer_content__contacts']}>
      <p className={styles['footer_content__contacts_title']}>
        {header}
      </p>
      <div className={styles['footer_content__contacts_data']}>
        {links.map((link, index) => (
          <Link 
            className={styles['footer_content__contact_link']}
            key={index}
            to={link.href}
          > 
            {link.label}
          </Link>
        ))}
      </div>
    </div>     
  )
}

export { NavigationBlock };