import React from "react";

import { Icon } from "~/common/components/index";
import { IconName } from "~/common/enums/index";
import { MyReviewCategory } from "~/common/types/my-reviews";

import styles from "./styles.module.scss";

type Properties = {
	category: MyReviewCategory;
};

const HeaderList: React.FC<Properties> = ({ category }) => {
	return (
		<ul className={styles["header__list"]}>
			{[category, "Зміст відгуку", "Статус"].map((item) => (
				<li className={styles["header__list-item"]} key={item}>
					<div>
						{item === "course"
							? "курс"
							: item === "company"
								? "компанія"
								: item}
						<Icon name={IconName.ARROW_DOWN} />
					</div>
				</li>
			))}
		</ul>
	);
};

export { HeaderList };
