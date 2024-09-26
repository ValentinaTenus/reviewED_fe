import React, { useState } from "react";

import { Icon } from "~/common/components/index";
import { IconName } from "~/common/enums/index";
import { MyReviewCategory } from "~/common/types/my-reviews";

import styles from "./styles.module.scss";

type Properties = {
	category: MyReviewCategory;
};

const HeaderList: React.FC<Properties> = ({ category }) => {
	const [activePopup, setActivePopup] = useState<null | string>(null);

	const handleClick = (item: string) => {
		setActivePopup((prev) => (prev === item ? null : item));
	};

	const popupItems = ["Option 1", "Option 2", "Option 3"];
	return (
		<ul className={styles["header__list"]}>
			{[category, "Review content", "Status"].map((item) => (
				<li
					className={styles["header__list-item"]}
					key={item}
					onClick={() => handleClick(item)}
				>
					{item}
					<Icon name={IconName.ARROW_DOWN} />

					{/* Dropdown menu */}
					{activePopup === item && (
						<ul className={styles["popup"]}>
							{popupItems.map((item) => (
								<li className={styles["popup__item"]} key={item}>
									{item}
								</li>
							))}
						</ul>
					)}
				</li>
			))}
		</ul>
	);
};

export { HeaderList };
