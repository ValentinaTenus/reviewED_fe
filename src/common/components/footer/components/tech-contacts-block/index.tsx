import React from "react";

import { Icon } from "~/common/components/index";
import { IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

const TechContactsBlock: React.FC = () => {
	return (
		<div className={styles["footer_content__contacts"]}>
			<p className={styles["footer_content__contacts_title"]}>
				Контакти технічної підтримки
			</p>
			<div className={styles["footer_content__contacts_data"]}>
				<div className={styles["footer_content__contacts"]}>
					<div className={styles["footer_content__contact"]}>
						<Icon
							className={styles["footer_content__contact-icon"]}
							name={IconName.PHONE}
						/>
						<a
							className={styles["footer_content__contact-link"]}
							href="tel:+380674646575"
						>
							<span>+380674646575</span>
						</a>
					</div>
					<div className={styles["footer_content__contact"]}>
						<Icon
							className={styles["footer_content__contact-icon"]}
							name={IconName.EMAIL}
						/>
						<a
							className={styles["footer_content__contact-link"]}
							href="mailto:reviewED@gmail.com"
						>
							<span>reviewED@gmail.com</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export { TechContactsBlock };
