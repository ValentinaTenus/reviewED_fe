import SearchIcon from '~/assets/images/search-normal.svg?react';
import ArrowRight from '~/assets/images/arrow-right.svg?react';
import ArrowDown from '~/assets/images/arrow-down.svg?react';
import ArrowUp from '~/assets/images/arrow-up.svg?react';
import Minus from '~/assets/images/minus.svg?react';
import Plus from '~/assets/images/plus.svg?react';
import { type IconName } from '~/common/enums/index';

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	search: SearchIcon,
	arrowDown: ArrowDown,
	arrowRight: ArrowRight,
	arrowUp: ArrowUp,
	minus: Minus,
	plus: Plus 
};

export { iconNameToSvg };