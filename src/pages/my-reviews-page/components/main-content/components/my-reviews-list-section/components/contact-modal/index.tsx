import React, { useCallback } from "react";

import { Icon } from "~/common/components";
import { IconName } from "~/common/enums";

import { DialogModal } from "../";
import styles from "./styles.module.scss";

type Properties = {
	closeModal: () => void;
};

const ContactModal: React.FC<Properties> = ({ closeModal }) => {
	const handleClose = useCallback(() => {
		closeModal();
	}, [closeModal]);

	return (
		<DialogModal classNames="contact-modal" onClose={handleClose} withIconClose>
			<div className={styles["contact-modal"]}>
				<div className={styles["contact-modal__icon"]}>
					<div className={styles["icon__inner"]}>
						<Icon name={IconName.MESSAGES} />
					</div>
				</div>

				<div className={styles["contact-modal__content"]}>
					<h2 className={styles["contact-modal__title"]}>
						Зв&apos;яжіться з нашою командою
					</h2>
					<p className={styles["contact-modal__text"]}>
						Якщо у вас виникли запитання або занепокоєння, звертатися до
						модераторів електронною поштою. Ми тут, щоб допомогти.
					</p>
				</div>

				<div className={styles["contact-modal__link"]}>
					<Icon name={IconName.SEND_MESSAGE} />
					<a href="#" rel="noopener noreferrer" target="_blank">
						Надішліть нам листа
					</a>
				</div>
			</div>
		</DialogModal>
	);
};

export { ContactModal };
