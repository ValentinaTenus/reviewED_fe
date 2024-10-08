import { forwardRef, useState } from "react";

import { Button } from "~/common/components";
import { ButtonSize, ButtonVariant, IconName } from "~/common/enums/index";
import { type GetCourseByIdResponseDto } from "~/common/types";

import { Contact } from "./components/contact";
import styles from "./styles.module.scss";

const PHONES_INDEX = 0;
const EMAIL_INDEX_IN_ARRAY = 1;
const FIRST_PHONE_INDEX = 1;

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
		const [isContactsShown, setIsContactsShown] = useState(false);

		const handleShowContact = () => {
			setIsContactsShown(true);
		};

		const contactsArray = course?.contact.split(/\r?\n/);
		const phonesArray =
			contactsArray &&
			contactsArray[PHONES_INDEX].split(/\(/).slice(FIRST_PHONE_INDEX);
		const formattedTelsArray = phonesArray?.map((item, index) => (
			<span
				className={styles["contacts__phone"]}
				key={index}
			>{`+38 (${item}`}</span>
		));

		const email = contactsArray?.[EMAIL_INDEX_IN_ARRAY];

		return (
			<div className={styles["contacts__bar"]}>
				<div className={styles["contacts__header"]} ref={ref}>
					{title}
				</div>
				{course && (
					<div className={styles["contacts__items"]}>
						<Contact iconName={IconName.LOCATION}>
							{defineLocation(course.location)}
						</Contact>
						<Contact iconName={IconName.BANK}>{course.company.name}</Contact>

						{course.website !== "None" && (
							<Contact iconName={IconName.GLOBAL}>{course.website}</Contact>
						)}
						{isContactsShown && (
							<>
								{formattedTelsArray && (
									<Contact iconName={IconName.PHONE}>
										<div className={styles["contacts__phone-container"]}>
											{formattedTelsArray}
										</div>
									</Contact>
								)}
								{email && <Contact iconName={IconName.EMAIL}>{email}</Contact>}
							</>
						)}
						<aside className={styles["contacts__button-container"]}>
							<Button size={ButtonSize.MEDIUM} variant={ButtonVariant.PRIMARY}>
								Зв&apos;язатися з компанією
							</Button>

							{!isContactsShown && (
								<Button
									onClick={() => handleShowContact()}
									size={ButtonSize.MEDIUM}
									variant={ButtonVariant.OUTLINED}
								>
									<p className={styles["contacts__bold-content"]}>
										Показати контакти
									</p>
								</Button>
							)}
						</aside>
					</div>
				)}
			</div>
		);
	},
);

ContactsBar.displayName = "ContactsBar";

export { ContactsBar };
