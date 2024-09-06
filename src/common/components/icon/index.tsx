import clsx from "clsx";

import { type IconName } from '~/common/enums/index.js';

import { iconNameToSvg } from './icon-name-to-svg';
import styles from './styles.module.scss';

type Properties = {
	className?: string | undefined;
	name: IconName;
};

const Icon: React.FC<Properties> = ({ className, name }: Properties) => {
	const IconComponent = iconNameToSvg[name];

	return (
		<IconComponent className={clsx(styles["icon"], className)} />
	);
};

export { Icon };