import { forwardRef, useCallback, useState } from "react";

import { Button, Input, Modal } from "~/common/components";
import {
	ButtonSize,
	ButtonType,
	ButtonVariant,
	IconName,
} from "~/common/enums/index";
import { useAppForm } from "~/common/hooks/index";
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
		const { control, errors } = useAppForm({
			defaultValues: {
				message: "",
				phoneNumber: "",
				userName: "",
			},
		});

		const [isContactsShown, setIsContactsShown] = useState(false);

		const handleShowContact = useCallback(() => {
			setIsContactsShown(true);
		}, []);

		const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

		const handleCloseRefundModal = useCallback(() => {
			setIsRefundModalOpen(false);
		}, []);

		const handleContact = useCallback(() => {
			window.location.href = `mailto:${course?.contact}`;
		}, [course?.contact]);

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
							<a
								className={styles["contacts__link"]}
								href={course.website}
								rel="noopener noreferrer"
								target="_blank"
							>
								<Contact iconName={IconName.GLOBAL}>{course.website}</Contact>
							</a>
						)}
						{isContactsShown && (
							<>
								{formattedTelsArray && (
									<a
										className={styles["contacts__link"]}
										href={`tel:${formattedTelsArray}`}
									>
										<Contact iconName={IconName.PHONE}>
											<div className={styles["contacts__phone-container"]}>
												{formattedTelsArray}
											</div>
										</Contact>
									</a>
								)}
								{email && email !== "none email" && (
									<a
										className={styles["contacts__link"]}
										href={`mailto:${email}`}
									>
										<Contact iconName={IconName.EMAIL}>{email}</Contact>
									</a>
								)}
							</>
						)}
						<aside className={styles["contacts__button-container"]}>
							<Button
								className={styles["contact__connect_button"]}
								onClick={handleContact}
								size={ButtonSize.MEDIUM}
								variant={ButtonVariant.PRIMARY}
							>
								Зв&apos;язатися з компанією
							</Button>
							<Modal
								isOpen={isRefundModalOpen}
								onClose={handleCloseRefundModal}
								title="Заявка на повернення коштів"
							>
								<form action="#">
									<Input
										control={control}
										errors={errors}
										label="Ім'я"
										name="userName"
										placeholder="Введіть ваше ім'я"
									/>
									<Input
										control={control}
										errors={errors}
										label="Номер телефону"
										name="phoneNumber"
										placeholder="+38 (099) 999 9999"
									/>
									<Input
										control={control}
										errors={errors}
										label="Ваш коментар"
										name="message"
										placeholder="Введіть текст коментаря"
										rows={5}
									/>
									<Button
										className={styles["form_button"]}
										isFullWidth
										type={ButtonType.SUBMIT}
										variant={ButtonVariant.PRIMARY}
									>
										Надіслати
									</Button>
								</form>
							</Modal>
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
