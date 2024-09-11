import clsx from 'clsx';
import { type ReactNode } from 'react';

import { ButtonSize, ButtonType, ButtonVariant } from '../../enums/index.ts';
import { type ValueOf } from '../../types/index.ts';

import styles from './styles.module.scss';

const variants: Record<ButtonVariant, string> = {
  default: styles.button__base,
  primary: styles.button__primary,
  login: styles.button__login,
  outlined: styles.button__outlined,
  share_linkedin: styles.button__share_linkedin,
  share_facebook: styles.button__share_facebook,
  share_twitter: styles.button__share_twitter,
};

const sizes: Record<ButtonSize, string> = {
  small: styles.size__small,
  medium: styles.size__medium,
  large: styles.size__large,
};


type ButtonProperties = {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  size?: ValueOf<typeof ButtonSize>;
  type?: ValueOf<typeof ButtonType>;
  variant: ValueOf<typeof ButtonVariant>;
  isFullWidth?: boolean;
  appendedIcon?: ReactNode;
  prependedIcon?: ReactNode;
};

const Button: React.FC<ButtonProperties> = ({
  children,
  disabled,
  onClick,
  className,
  type,
  variant,
  isFullWidth,
  size = ButtonSize.SMALL,
  appendedIcon,
  prependedIcon,
  ...restProperties
}) => {
  return (
    <button
      disabled={disabled}
        onClick={onClick}
          className={clsx(
            styles.button,
            sizes[size],
            variants[variant],
            isFullWidth && styles['width__full'],
            className,
          )}
          type={type}
          {...restProperties}
      >
        {prependedIcon}
        {children}
        {appendedIcon}
      </button>
  );
};

export { Button };
