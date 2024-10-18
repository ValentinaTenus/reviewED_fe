import React from "react";

import { Modal } from "~/common/components/modal";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import styles from "./styles.module.scss";

const ReportSuccessModal: React.FC<{
	isOpen: boolean;
	onClose: () => void;
}> = ({ isOpen, onClose }) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Ваша скарга була відправлена!"
		>
			<div className={styles["modal_content"]}>
				<div className={`${globalStyles["body-r"]} ${styles["modal_text"]}`}>
					<p>Дякуємо за Ваше звернення!</p>
					<p>
						Ми цінуємо Ваші зусилля у допомозі покращити наш сервіс. Наші
						фахівці вже працюють над вирішенням питання.
					</p>
					<p>
						Якщо у Вас є додаткові запитання або потреба в уточненні, будь
						ласка, зв&apos;яжіться з нашою службою підтримки.
					</p>
					<p>З повагою, ReviewED!</p>
				</div>
			</div>
		</Modal>
	);
};

export { ReportSuccessModal };
