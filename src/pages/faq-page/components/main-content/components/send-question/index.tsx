import React from "react";

import { Button, Input } from "~/common/components/index";
import { ButtonType, ButtonVariant } from "~/common/enums/index";
import { useAppForm } from "~/common/hooks/index";

import styles from "./styles.module.scss";

const SendQuestionSection: React.FC = () => {
	const { control, errors } = useAppForm({
		defaultValues: {
			email: "",
			faqQuestion: "",
		},
	});

	return (
		<div className={styles["send_question_container"]}>
			<div className={styles["send_question_text_section"]}>
				<p className={styles["text_section_title"]}>
					Не знайшли{" "}
					<span className={styles["title_yellow"]}>
						відповідь на своє запитання ?
					</span>
				</p>
				<p className={styles["text_section_text"]}>
					Зв&apos;яжіться з нами, щоб додати вашу компанію і отримати чесні
					відгуки
				</p>
			</div>
			<div className={styles["send_question_form_section"]}>
				<p className={styles["form_section_title"]}>Надіслати запитання</p>
				<form className={styles["send_question_form"]}>
					<div className={styles["form_inputs"]}>
						<Input
							className={styles["input"]}
							control={control}
							errors={errors}
							label="Текст запитання"
							maxWords={200}
							name="faqQuestion"
							placeholder="Текст запитання"
							rows={1}
						/>
						<Input
							className={styles["form_input"]}
							control={control}
							errors={errors}
							label="Електронна адреса"
							name="email"
							placeholder="example@gmail.com"
						/>
					</div>
					<Button
						className={styles["form_button"]}
						isFullWidth
						type={ButtonType.SUBMIT}
						variant={ButtonVariant.PRIMARY}
					>
						Надіслати
					</Button>
				</form>
			</div>
		</div>
	);
};

export { SendQuestionSection };
