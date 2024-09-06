import SearchIcon from '~/assets/images/search-normal.svg?react';
import { type IconName } from '~/common/enums/index';

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	search: SearchIcon,
};

export { iconNameToSvg };