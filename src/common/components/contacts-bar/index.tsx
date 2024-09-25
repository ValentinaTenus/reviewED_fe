import React from "react";

import { IconName } from "~/common/enums/index";

import { Contact } from "./contact";
import styles from "./styles.module.scss";

import { type Course } from "~/common/types";

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
		<div className={styles["main_content"]}>
			<Contact
				iconName={IconName.PEOPLE}
				title={course ? defineLocation(course.location) : ""}
			/>
			<Contact iconName={IconName.PEOPLE} title={course ? course.company : ""} />
			<Contact iconName={IconName.PEOPLE} title={course ? course.website : ""}  />
		</div>
	);
};

export { ContactsBar };
