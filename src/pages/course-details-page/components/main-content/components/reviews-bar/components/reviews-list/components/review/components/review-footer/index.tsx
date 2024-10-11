import React from "react";

import { Button, Icon } from "~/common/components";
import { ButtonSize, ButtonVariant, IconName } from "~/common/enums";
import { type CourseReview } from "~/common/types";

import styles from "./styles.module.scss";

type ReviewFooterProperties = {
	review: CourseReview;
};

const ReviewFooter: React.FC<ReviewFooterProperties> = ({ review }) => {
	return (
		<div className={styles["review__footer"]}>
			<Button
				className={styles["footer__button"]}
				prependedIcon={
					<Icon className={styles["footer__icon"]} name={IconName.FLAG} />
				}
				size={ButtonSize.SMALL}
				variant={ButtonVariant.DEFAULT}
			>
				Report
			</Button>
			<aside className={styles["footer__button-container"]}>
				<Button
					className={styles["footer__button"]}
					prependedIcon={
						<Icon className={styles["footer__icon"]} name={IconName.SHARE} />
					}
					size={ButtonSize.SMALL}
					variant={ButtonVariant.DEFAULT}
				>
					Share
				</Button>
				<Button
					className={styles["footer__button"]}
					prependedIcon={
						<Icon className={styles["footer__icon"]} name={IconName.LIKE} />
					}
					size={ButtonSize.SMALL}
					variant={ButtonVariant.DEFAULT}
				>
					{review.count_likes}
				</Button>
			</aside>
		</div>
	);
};

export { ReviewFooter };
