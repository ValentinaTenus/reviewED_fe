import ArrowRight from '~/assets/images/arrow-right.svg?react';
import ArrowDown from '~/assets/images/arrow-down.svg?react';
import ArrowUp from '~/assets/images/arrow-up.svg?react';
import Email from '~/assets/images/sms.svg?react';
import Facebook from '~/assets/images/facebook.svg?react';
import Minus from '~/assets/images/minus.svg?react';
import Linkedin from '~/assets/images/iconoir_linkedin.svg?react';
import Youtube from '~/assets/images/youtube.svg?react';
import Xrp from '~/assets/images/xrp-(xrp).svg?react';
import Plus from '~/assets/images/plus.svg?react';
import Phone from '~/assets/images/call.svg?react';
import SearchIcon from '~/assets/images/search-normal.svg?react';

import { type IconName } from '~/common/enums/index';

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	arrowDown: ArrowDown,
	arrowRight: ArrowRight,
	arrowUp: ArrowUp,
	email: Email,
	facebook: Facebook,
	linkedin: Linkedin,
	minus: Minus,
	phone: Phone,
	plus: Plus,
	youtube: Youtube,
	xrp: Xrp
};

export { iconNameToSvg };
