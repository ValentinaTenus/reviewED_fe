import clsx from "clsx";
import React from "react";

import { type IconName } from "~/common/enums/index.js";

import { iconNameToSvg } from "./icon-name-to-svg";
import styles from "./styles.module.scss";

type Properties = {
	className?: string | undefined;
	name: IconName;
	withButton?: boolean;
};

const Icon: React.FC<Properties> = ({
	className,
	name,
	withButton,
}: Properties) => {
	const IconComponent = iconNameToSvg[name];

	return (
		<IconComponent
			className={clsx(
				styles["icon"],
				className,
				withButton && styles["icon-in-button"],
			)}
		/>
	);
};

export { Icon };
