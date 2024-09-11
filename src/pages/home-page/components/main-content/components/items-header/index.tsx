import { ReactNode } from 'react';

import { Button, Icon } from '~/common/components/index';
import { ButtonVariant, IconName } from '~/common/enums/index';

import styles from './styles.module.scss';

type ItemsHeaderProperties = {
  className?: string;
  header: string;
  children?: ReactNode;
  screenWidth: number;
};

const ItemsHeader: React.FC<ItemsHeaderProperties> = ({
  header, screenWidth
}) => {

  return (
    <div className={styles['header_wrapper']}>
      <p className={styles['header']}>{header}</p>
      <Button
        className={styles['arrow_button']}
        variant={ButtonVariant.OUTLINED} 
        appendedIcon={<Icon name={IconName.ARROW_RIGHT}/>}>
        {screenWidth > 768 ? 'Дивитися всі' : ''}
      </Button>
    </div>
  )
};

export { ItemsHeader };