import React from "react";
import * as yup from "yup";

import { Button, Input } from "~/common/components/index";
import { ButtonType, ButtonVariant } from "~/common/enums/index";
import { useAppForm } from "~/common/hooks/index";

import styles from "./styles.module.scss";

const MIN_SYMBOL_COUNT = 30;

const schema = yup
	.object({
		email: yup.string().email().required(),
		faqQuestion: yup.string().required().min(MIN_SYMBOL_COUNT),
	})
	.required();

type FormData = yup.InferType<typeof schema>;

const SendQuestionSection: React.FC = () => {
	const { control, errors, handleSubmit, isValid, reset } =
		useAppForm<FormData>({
			defaultValues: {
				email: "",
				faqQuestion: "",
			},
			mode: "onChange",
			validationSchema: schema,
		});

	const handleFormSubmit = (data: FormData) => {
		alert(`Query sended: ${JSON.stringify(data)}`);
		reset();
	};

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
					Зв&apos;яжіться з нами щоб отримати відповідь.
				</p>
			</div>
			<div className={styles["send_question_form_section"]}>
				<p className={styles["form_section_title"]}>Надіслати запитання</p>
				<form
					className={styles["send_question_form"]}
					onSubmit={handleSubmit(handleFormSubmit)}
				>
					<div className={styles["form_inputs"]}>
						<Input
							className={styles["form_input"]}
							control={control}
							errors={errors}
							helperText="Мінімум 30 символів"
							label="Ваше запитання"
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
						disabled={!isValid}
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
