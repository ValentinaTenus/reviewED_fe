import React from "react";

import { Button, Icon } from "~/common/components/index";
import { ButtonSize, ButtonVariant, IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

const TopSection: React.FC = () => {
	return (
		<div className={styles["top-section"]}>
			<div className={styles["top-section__text"]}>
				<h1 className={styles["top-section__title"]}>My Reviews</h1>
				<h3 className={styles["top-section__subtitle"]}>
					User name
					<span>
						<Icon name={IconName.SHIELD_TICK} withButton /> Verified Via
						LinkedIn
					</span>
				</h3>
			</div>
			<div className={styles["top-section__button"]}>
				<Button
					isFullWidth
					onClick={() => {}}
					size={ButtonSize.MEDIUM}
					variant={ButtonVariant.PRIMARY}
				>
					<Icon name={IconName.PLUS_SQUARE} withButton />
					Add review
				</Button>
			</div>
		</div>
	);
};

export { TopSection };
