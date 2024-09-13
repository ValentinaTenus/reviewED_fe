import { FC, useEffect, useState } from 'react';

import Logo from '~/assets/images/logo.svg?react';
import { 
  CompaniesLinksDesktop, 
  CompaniesLinksTablets,
  CompaniesLinksSmartphones,
  CoursesLinksSmartphones,
  CoursesLinksTablets,
  CoursesLinksDesktop,  
  OthersFooterLinks,  
  SocialLinks } from '~/common/constants/index';
import { FooterNavigationLink } from '~/common/types/index';

import { NavigationBlock, TechContactsBlock, SocialMediaLinks } from './components/index';
import styles from './styles.module.scss';

const Footer: FC = () => {
  const [companiesLinks, setCompaniesLinks] = useState<FooterNavigationLink[]>([]);
  const [coursesLinks, setCoursesLinks] = useState<FooterNavigationLink[]>([]);

  const updateVisibleItems = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 768) {
      setCompaniesLinks(CompaniesLinksSmartphones);
      setCoursesLinks(CoursesLinksSmartphones);
    } else if (screenWidth <= 1280){
      setCompaniesLinks(CompaniesLinksTablets);
      setCoursesLinks(CoursesLinksTablets)
    } else {
      setCompaniesLinks(CompaniesLinksDesktop); 
      setCoursesLinks(CoursesLinksDesktop)
    }
  };

  useEffect(() => {
    updateVisibleItems(); 
    window.addEventListener('resize', updateVisibleItems);

    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);

  return (
    <div className={styles['footer__container']}>
        <div className={styles['footer_content__container']}>
          <div className={styles['footer_content']}>

            <div className={styles['footer_content__logo_container']}>
              <Logo className={styles['footer_content__logo']} />
              <TechContactsBlock />
            </div>

            <NavigationBlock
              className={styles['footer_content__courses']}
              header='Курси'
              links={coursesLinks}
            />
            <NavigationBlock
              className={styles['footer_content__companies']}
              header='Компанії'
              links={companiesLinks}
            />

            <div className={styles['footer_content__social_media']}>
              <SocialMediaLinks 
                header='Ми в соц.мережах' 
                links={SocialLinks}
              />
              <NavigationBlock
                classNameLink={styles['footer_content__small_link']}
                header='Інше'
                links={OthersFooterLinks}
              />
            </div>
          </div>
          <p className={styles['footer__link']}>
            © 2024 ReviewED. Всі права захищені
          </p>
        </div>
    </div>
  )
}

export { Footer };