import React from "react";

import styles from "./styles.module.scss";
import { ReviewsList } from "./components/reviews-list";
import { ReviewsStats } from "./components/reviews-stats";
import { Button } from "~/common/components";
import { ButtonVariant, ButtonSize } from "~/common/enums/index";

type ReviewsBarProperties = {};

const mockStats = {
	"one": 10,
	"two": 60,
	"three": 4,
	"four": 100,
	"five": 110,
};
const ReviewsBar: React.FC<ReviewsBarProperties> = ({}) => {
	return (
		<div className={styles["reviews-bar"]}>
			<h3 className={styles["reviews-bar__header"]}>Відгуки</h3>
			<ReviewsList />
			<ReviewsStats stats={mockStats} />
			<Button
				className={styles["reviews-bar__button"]}
				size={ButtonSize.MEDIUM}
				variant={ButtonVariant.PRIMARY}
			>
				Написати відгук
			</Button>
		</div>
	);
};

export { ReviewsBar };
