import React, { useState } from "react";

import { Button, Icon } from "~/common/components";
import { ButtonVariant, IconName } from "~/common/enums";
import { Company } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import styles from "./styles.module.scss";

const Contacts = React.forwardRef<HTMLDivElement, { company: Company }>(
	({ company }, ref) => {
		const [isContactsShow, setIsContactsShow] = useState(false);

		const handleClick = () => {
			setIsContactsShow(!isContactsShow);
		};

		const handleContact = () => {
			window.location.href = `mailto:${company.email}`;
		};

		return (
			<>
				<div className={styles["contacts"]} ref={ref}>
					<h2 className={styles["contacts_heading"]}>Контакти</h2>
					<ul className={styles["contacts_list"]}>
						<li className={styles["contacts_item"]}>
							<Icon
								className={styles["contacts_location"]}
								name={IconName.LOCATION}
							/>
							<span className={globalStyles["p-sb"]}>Online</span>
						</li>
						<li className={styles["contacts_item"]}>
							<Icon className={styles["contacts_bank"]} name={IconName.BANK} />
							<span className={globalStyles["p-sb"]}>{company.name}</span>
						</li>
						<li className={styles["contacts_item"]}>
							<Icon
								className={styles["contacts_global"]}
								name={IconName.GLOBAL}
							/>
							<span className={globalStyles["p-sb"]}>{company.website}</span>
						</li>
						<li
							className={`${styles["contacts_item"]} ${!isContactsShow && styles["hidden"]}`}
						>
							<span className={globalStyles["p-sb"]}>
								{company.contact_person}
							</span>
						</li>
						<li
							className={`${styles["contacts_item"]} ${!isContactsShow && styles["hidden"]}`}
						>
							{company.phone_numbers.map((phone_number, index) => (
								<span
									className={`${globalStyles["p-sb"]} ${styles["contacts_phone-number"]}`}
									key={index}
								>
									{phone_number}
								</span>
							))}
						</li>
					</ul>
					<div className={styles["contacts_buttons"]}>
						<Button onClick={handleContact} variant={ButtonVariant.PRIMARY}>
							Зв&#39;язатися з компанією
						</Button>
						<Button onClick={handleClick} variant={ButtonVariant.OUTLINED}>
							{!isContactsShow && "Показати контакти"}
							{isContactsShow && "Сховати контакти"}
						</Button>
					</div>
				</div>
			</>
		);
	},
);

Contacts.displayName = "Contacts";

export { Contacts };
