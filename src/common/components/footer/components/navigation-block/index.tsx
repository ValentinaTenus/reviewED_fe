import { FC } from 'react';
import { Link } from 'react-router-dom';

import { type FooterNavigationLink } from '~/common/types/index';
import styles from './styles.module.scss';
import clsx from 'clsx';

type NavigationBlockProperties = {
  className?: string;
  classNameLink?: string;
  header: string;
  links: FooterNavigationLink[];
}

const NavigationBlock: FC<NavigationBlockProperties> = ({
  className, classNameLink, header, links
}) => {
  
  return (
    <div className={clsx(styles['footer_content__contacts'], className)}>
      <p className={styles['footer_content__contacts_title']}>
        {header}
      </p>
      <div className={styles['footer_content__contacts_data']}>
        {links.map((link, index) => (
          <Link 
            className={clsx(styles['footer_content__contact_link'], 
             link.label.length > 12 && classNameLink
            )}
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