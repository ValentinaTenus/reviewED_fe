import React from "react";

import styles from "./styles.module.scss";
import { Button } from "~/common/components";
import { ButtonSize, ButtonVariant } from "~/common/enums";
import { Icon } from "~/common/components";
import { IconName } from "~/common/enums";

type ReviewFooterProperties = {};

const ReviewFooter: React.FC<ReviewFooterProperties> = ({}) => {
	return (
		<div className={styles["review__footer"]}>
			<Button
			className={styles["footer__button"]}
				size={ButtonSize.SMALL}
				variant={ButtonVariant.DEFAULT}
				prependedIcon={
					<Icon className={styles["footer__icon"]} name={IconName.FLAG} />
				}
			>
				Report
			</Button>
			<aside className={styles["footer__button-container"]}>
				<Button
				className={styles["footer__button"]}
					size={ButtonSize.SMALL}
					variant={ButtonVariant.DEFAULT}
					prependedIcon={
						<Icon className={styles["footer__icon"]} name={IconName.SHARE} />
					}
				>
					Share
				</Button>
				<Button
				className={styles["footer__button"]}
					size={ButtonSize.SMALL}
					variant={ButtonVariant.DEFAULT}
					prependedIcon={
						<Icon className={styles["footer__icon"]} name={IconName.LIKE} />
					}
				>
					Numba of likes
				</Button>
			</aside>
		</div>
	);
};

export { ReviewFooter };
