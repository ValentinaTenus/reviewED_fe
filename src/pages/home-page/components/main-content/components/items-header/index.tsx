import React, { ReactNode } from "react";

import { Button, Icon } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/index";
import { ButtonVariant, IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

type ItemsHeaderProperties = {
	children?: ReactNode;
	className?: string;
	header: string;
	onClick: () => void;
	screenWidth: number;
};

const ItemsHeader: React.FC<ItemsHeaderProperties> = ({
	header,
	onClick,
	screenWidth,
}) => {
	return (
		<div className={styles["header_wrapper"]}>
			<p className={styles["header"]}>{header}</p>
			<Button
				appendedIcon={<Icon name={IconName.ARROW_RIGHT} />}
				className={styles["arrow_button"]}
				onClick={onClick}
				variant={ButtonVariant.OUTLINED}
			>
				{screenWidth > ScreenBreakpoints.TABLET ? "Дивитись всі" : ""}
			</Button>
		</div>
	);
};

export { ItemsHeader };
