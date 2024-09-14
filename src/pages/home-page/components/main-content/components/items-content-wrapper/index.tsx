import clsx from 'clsx';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type ItemsContentWrapperProperties = {
  className?: string;
  children: ReactNode;
};

const ItemsContentWrapperSection: React.FC<ItemsContentWrapperProperties> = ({
  children, className
}) => {

  return (
    <div className={clsx(styles['items_wrapper'], className)}>
      {children}
    </div>
  )
};

export { ItemsContentWrapperSection };