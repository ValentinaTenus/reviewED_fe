import { FC } from 'react';

import Logo from '~/assets/images/logo.svg?react';
import { CompaniesLinks, CoursesLinks,  OthersFooterLinks,  SocialLinks } from '~/common/constants/index';

import { NavigationBlock, TechContactsBlock, SocialMediaLinks } from './components/index';
import styles from './styles.module.scss';

const Footer: FC = () => {
  return (
    <div className={styles['footer__container']}>
        <div className={styles['footer_content__container']}>
          <div className={styles['footer_content']}>

            <div className={styles['footer_content__logo_container']}>
              <Logo className={styles['footer_content__logo']} />
              <TechContactsBlock />
            </div>

            <NavigationBlock 
              header='Курси'
              links={CoursesLinks}
            />
            <NavigationBlock 
              header='Компанії'
              links={CompaniesLinks}
            />

            <div className={styles['footer_content__social_media']}>
              <SocialMediaLinks 
                header='Ми в соц.мережах' 
                links={SocialLinks}
              />
              <NavigationBlock
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