import React, { forwardRef } from "react";

import { Button, Icon } from "~/common/components";
import { ButtonVariant, IconName } from "~/common/enums";
import { Company } from "~/common/types";

import styles from "./styles.module.scss";

// eslint-disable-next-line react/display-name
const Contacts = forwardRef<HTMLDivElement, { company: Company }>(
	({ company }, ref) => {
		return (
			<>
				<div className={styles["contacts"]} ref={ref}>
					<h2 className={styles["contacts_heading"]}>Контакти</h2>
					<ul className={styles["contacts_list"]}>
						<li className={styles["contacts_item"]}>
							<Icon name={IconName.LOCATION} />
							<span className={styles["p-sb"]}>Online</span>
						</li>
						<li className={styles["contacts_item"]}>
							<Icon name={IconName.BANK} />
							<span className={styles["p-sb"]}>{company.name}</span>
						</li>
						<li className={styles["contacts_item"]}>
							<Icon name={IconName.GLOBAL} />
							<span className={styles["p-sb"]}>{company.website}</span>
						</li>
					</ul>
					<div className={styles["contacts_buttons"]}>
						<Button variant={ButtonVariant.PRIMARY}>
							Зв&#39;язатися з компанією
						</Button>
						<Button variant={ButtonVariant.OUTLINED}>Показати контакти</Button>
					</div>
				</div>
			</>
		);
	},
);

export { Contacts };
