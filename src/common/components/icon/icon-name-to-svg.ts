import React from "react";

import ArrowDown from "~/assets/images/arrow-down.svg?react";
import ArrowRight from "~/assets/images/arrow-right.svg?react";
import ArrowRightWide from "~/assets/images/arrow-right-2.svg?react";
import ArrowUp from "~/assets/images/arrow-up.svg?react";
import Phone from "~/assets/images/call.svg?react";
import Facebook from "~/assets/images/facebook.svg?react";
import Linkedin from "~/assets/images/iconoir_linkedin.svg?react";
import ListView from "~/assets/images/list-view.svg?react";
import Minus from "~/assets/images/minus.svg?react";
import Plus from "~/assets/images/plus.svg?react";
import SearchIcon from "~/assets/images/search-normal.svg?react";
import ShieldTick from "~/assets/images/shield-tick.svg?react";
import Email from "~/assets/images/sms.svg?react";
import SortIcon from "~/assets/images/sort.svg?react";
import TableView from "~/assets/images/table-view.svg?react";
import Xrp from "~/assets/images/xrp-(xrp).svg?react";
import Youtube from "~/assets/images/youtube.svg?react";
import { type IconName } from "~/common/enums/index";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	arrowDown: ArrowDown,
	arrowRight: ArrowRight,
	arrowRightWide: ArrowRightWide,
	arrowUp: ArrowUp,
	email: Email,
	facebook: Facebook,
	linkedin: Linkedin,
	listView: ListView,
	minus: Minus,
	phone: Phone,
	plus: Plus,
	search: SearchIcon,
	shieldTick: ShieldTick,
	sort: SortIcon,
	tableView: TableView,
	xrp: Xrp,
	youtube: Youtube,
};

export { iconNameToSvg };
