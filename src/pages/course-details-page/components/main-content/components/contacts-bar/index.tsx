import { forwardRef } from "react";

import { Button } from "~/common/components";
import { ButtonSize, ButtonVariant, IconName } from "~/common/enums/index";
import { type GetCourseByIdResponseDto } from "~/common/types";

import { Contact } from "./components/contact";
import styles from "./styles.module.scss";

type ContactsBarProperties = {
	course: GetCourseByIdResponseDto | undefined;
	title: string;
};

const defineLocation = (location: string): string => {
	if (location === "None") {
		return "Online";
	} else {
		return location;
	}
};

const ContactsBar = forwardRef<HTMLDivElement, ContactsBarProperties>(
	({ course, title }, ref) => {
		return (
			<div className={styles["contacts-bar"]} ref={ref}>
				<div className={styles["contacts-header"]}>{title}</div>
				<Contact
					iconName={IconName.LOCATION}
					title={course ? defineLocation(course.location) : ""}
				/>
				<Contact
					iconName={IconName.BANK}
					title={course ? course.company.name : ""}
				/>
				<Contact
					iconName={IconName.GLOBAL}
					title={course ? course.website : ""}
				/>
				<aside className={styles["contacts__button-container"]}>
					<Button size={ButtonSize.MEDIUM} variant={ButtonVariant.PRIMARY}>
						Зв&apos;язатися з компанією
					</Button>
					<Button size={ButtonSize.MEDIUM} variant={ButtonVariant.OUTLINED}>
						<p className={styles["contacts__bold-content"]}>
							Показати контакти
						</p>
					</Button>
				</aside>
			</div>
		);
	},
);

ContactsBar.displayName = "ContactsBar";

export { ContactsBar };
