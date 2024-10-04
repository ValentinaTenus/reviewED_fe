import React from "react";

import { Button, Input } from "~/common/components/index";
import { ButtonType, ButtonVariant } from "~/common/enums/index";
import { useAppForm } from "~/common/hooks/index";

import styles from "./styles.module.scss";

const AddCompanySection: React.FC = () => {
	const { control, errors } = useAppForm({
		defaultValues: {
			companyName: "",
			email: "",
		},
	});

	return (
		<div className={styles["add_company_container"]}>
			<div className={styles["add_company_text_section"]}>
				<p className={styles["text_section_title"]}>
					Не знайшли{" "}
					<span className={styles["title_yellow"]}>свою компанію?</span>
				</p>
				<p className={styles["text_section_text"]}>
					Зв&apos;яжіться з нами, щоб додати вашу компанію і отримати чесні
					відгуки
				</p>
			</div>
			<div className={styles["add_company_form_section"]}>
				<p className={styles["form_section_title"]}>Додати компанію</p>
				<form className={styles["add_company_form"]}>
					<div className={styles["form_inputs"]}>
						<Input
							className={styles["form_input"]}
							control={control}
							errors={errors}
							label="Назва компанії"
							name="companyName"
							placeholder="Введіть назву компанії"
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
						Зв&apos;язатися
					</Button>
				</form>
			</div>
		</div>
	);
};

export { AddCompanySection };
