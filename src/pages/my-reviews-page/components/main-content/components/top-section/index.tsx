import React from "react";

import { Icon } from "~/common/components/index";
import { IconName } from "~/common/enums/index";
import { useAppSelector } from "~/redux/hooks.type";

import styles from "./styles.module.scss";

const TopSection: React.FC = () => {
	const { user } = useAppSelector((state) => state.auth);

	return (
		<div className={styles["top-section"]}>
			<div className={styles["top-section__text"]}>
				<h1 className={styles["top-section__title"]}>Мої відгуки</h1>
				<h3 className={styles["top-section__subtitle"]}>
					{user?.full_name}
					<span>
						<Icon name={IconName.SHIELD_TICK} withButton /> Верифіковано через
						LinkedIn
					</span>
				</h3>
			</div>
		</div>
	);
};

export { TopSection };
