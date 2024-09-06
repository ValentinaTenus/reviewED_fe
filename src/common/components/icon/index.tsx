import { type SizeProp } from '@fortawesome/fontawesome-svg-core';
import {
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IconName, IconSize } from '~/common/enums/index';

const iconNameToSvgIcon = {
    [IconName.PLUS]: faPlus,
};

type IconProperties = {
    className?: string;
    name: IconName;
    size?: SizeProp;
    color?: string;
};

const Icon: React.FC<IconProperties> = ({
    className,
    name,
    size = IconSize.LARGE,
    color,
}) => (
    <FontAwesomeIcon
        className={className as string}
        icon={iconNameToSvgIcon[name]}
        size={size}
        color={color as string}
    />
);

export { Icon };
