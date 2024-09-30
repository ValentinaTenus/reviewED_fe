
import React from "react";

import ArrowLeftLong from "~/assets/images/arrow_left_long_light.svg?react";
import ArrowRightLong from "~/assets/images/arrow_right_long_light.svg?react";
import ArrowDown from "~/assets/images/arrow-down.svg?react";
import ArrowRight from "~/assets/images/arrow-right.svg?react";
import ArrowRightWide from "~/assets/images/arrow-right-2.svg?react";
import ArrowUp from "~/assets/images/arrow-up.svg?react";
import Audience from "~/assets/images/audience.svg?react";
import Bank from "~/assets/images/bank.svg?react";
import Phone from "~/assets/images/call.svg?react";
import Close from "~/assets/images/close.svg?react";
import DollarSign from "~/assets/images/dollar-circle.svg?react";
import Facebook from "~/assets/images/facebook.svg?react";
import Filter from "~/assets/images/filter.svg?react";
import Flag from "~/assets/images/flag.svg?react";
import Global from "~/assets/images/global.svg?react";
import Linkedin from "~/assets/images/iconoir_linkedin.svg?react";
import Like from "~/assets/images/like.svg?react";
import LinkedInLogo from "~/assets/images/linkedIn-logo.svg?react";
import ListView from "~/assets/images/list-view.svg?react";
import Location from "~/assets/images/location.svg?react";
import Minus from "~/assets/images/minus.svg?react";
import People from "~/assets/images/people.svg?react";
import Plus from "~/assets/images/plus.svg?react";
import Price from "~/assets/images/price.svg?react";
import SearchIcon from "~/assets/images/search-normal.svg?react";
import Share from "~/assets/images/share.svg?react";
import ShieldTick from "~/assets/images/shield-tick.svg?react";
import Email from "~/assets/images/sms.svg?react";
import SortIcon from "~/assets/images/sort.svg?react";
import Star from "~/assets/images/star.svg?react";
import TableView from "~/assets/images/table-view.svg?react";
import Teacher from "~/assets/images/teacher.svg?react";
import Xrp from "~/assets/images/xrp-(xrp).svg?react";
import Youtube from "~/assets/images/youtube.svg?react";
import { type IconName } from "~/common/enums/index";

const iconNameToSvg: Record<
	IconName,
	React.FC<React.SVGProps<SVGSVGElement>>
> = {
	arrowDown: ArrowDown,
	arrowLeftLong: ArrowLeftLong,
	arrowRight: ArrowRight,
	arrowRightLong: ArrowRightLong,
	arrowRightWide: ArrowRightWide,
	arrowUp: ArrowUp,
	audience: Audience,
	bank: Bank,
	close: Close,
	dollarSign: DollarSign,
	email: Email,
	facebook: Facebook,
	filter: Filter,
	flag: Flag,
	global: Global,
	like: Like,
	linkedin: Linkedin,
	linkedinLogo: LinkedInLogo,
	listView: ListView,
	location: Location,
	minus: Minus,
	people: People,
	phone: Phone,
	plus: Plus,
	price: Price,
	search: SearchIcon,
	share: Share,
	shieldTick: ShieldTick,
	sort: SortIcon,
	star: Star,
	tableView: TableView,
	teacher: Teacher,
	xrp: Xrp,
	youtube: Youtube,
};

export { iconNameToSvg };