import React from "react";

import { ButtonVariant, IconName } from "~/common/enums/index";
import { type Course } from "~/common/types";

import { Button } from "../button";
import { Contact } from "./contact";
import styles from "./styles.module.scss";

type ContactsBarProperties = {
	course: Course | undefined;
};

const defineLocation = (location: string): string => {
	if (location === "None") {
		return "Online";
	} else {
		return location;
	}
};

const ContactsBar: React.FC<ContactsBarProperties> = ({ course }) => {
	return (
		<div className={styles["contacts-bar"]}>
			<Contact
				iconName={IconName.LOCATION}
				title={course ? defineLocation(course.location) : ""}
			/>
			<Contact
				iconName={IconName.BUILDING}
				title={course ? course.company : ""}
			/>
			<Contact iconName={IconName.GLOBE} title={course ? course.website : ""} />
			<aside>
				<Button variant={ButtonVariant.PRIMARY} />
				<Button variant={ButtonVariant.OUTLINED} />
			</aside>
		</div>
	);
};

export { ContactsBar };
