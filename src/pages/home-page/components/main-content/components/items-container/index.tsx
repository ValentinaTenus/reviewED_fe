import { ReactNode } from 'react';

import styles from './styles.module.scss';
import clsx from 'clsx';

type ItemsContainerProperties = {
  className?: string;
  children?: ReactNode;
};

const ItemsContainer: React.FC<ItemsContainerProperties> = ({
   className, children 
}) => {

  return (
    <div className={clsx(styles['items_container'], className)}>
      {children}
    </div>
  )
};

export { ItemsContainer };