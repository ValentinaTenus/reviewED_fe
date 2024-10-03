import React from "react";

import { Button, Icon } from "~/common/components";
import { ButtonSize, ButtonVariant, IconName } from "~/common/enums";

import styles from "./styles.module.scss";

const ReviewFooter: React.FC = () => {
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
					Numba of likes
				</Button>
			</aside>
		</div>
	);
};

export { ReviewFooter };
