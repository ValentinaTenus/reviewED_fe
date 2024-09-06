import { Button } from '~/common/components';
import { Search } from '../index';

import styles from './styles.module.scss';
import { ButtonVariant } from '~/common/enums';

const BurgerMenu = () => {

  return (
    <div className={styles['user_menu_wrapper']}>
      <div className={styles['user_menu']}>
        <Search />
        <ul className={styles['user_menu__list']}>
          <li>Курси</li>
          <li>Компанії</li>
        </ul>
      </div>
      <div className={styles['user_menu__button']}>
        <Button variant={ButtonVariant.LOGIN} isFullWidth={true}>
          Вхід
        </Button>
      </div>
    </div>
  )
}

export { BurgerMenu };