import clsx from "clsx";
import React, { useState } from "react";

import { Icon, IconButton } from "~/common/components/index";
import { IconName, ViewStyle } from "~/common/enums/index";

import styles from "./styles.module.scss";

type ViewToggleProps = {
	defaultViewStyle?: ViewStyle;
	onChange: (selectedView: ViewStyle) => void;
};

const ViewTabs: React.FC<ViewToggleProps> = ({
	defaultViewStyle,
	onChange,
}) => {
	const [selectedView, setSelectedView] = useState<ViewStyle>(
		defaultViewStyle || ViewStyle.TABLE,
	);

	const handleChooseTableView = () => {
		setSelectedView(ViewStyle.TABLE);
		onChange(ViewStyle.TABLE);
	};

	const handleChooseListView = () => {
		setSelectedView(ViewStyle.LIST);
		onChange(ViewStyle.LIST);
	};

	return (
		<div className={styles["view-toggle"]}>
			<div className={styles["view-toggle__button_wrapper"]}>
				<IconButton
					className={clsx(
						styles["view-toggle__button"],
						selectedView === ViewStyle.TABLE &&
							styles["view-toggle__button_active"],
					)}
					onClick={handleChooseTableView}
				>
					<Icon name={IconName.TABLE_VIEW} />
				</IconButton>
			</div>

			<div className={styles["view-toggle__divider"]} />

			<div className={styles["view-toggle__button_wrapper"]}>
				<IconButton
					className={clsx(
						styles["view-toggle__button"],
						selectedView === ViewStyle.LIST &&
							styles["view-toggle__button_active"],
					)}
					onClick={handleChooseListView}
				>
					<Icon name={IconName.LIST_VIEW} />
				</IconButton>
			</div>
		</div>
	);
};

export { ViewTabs };
