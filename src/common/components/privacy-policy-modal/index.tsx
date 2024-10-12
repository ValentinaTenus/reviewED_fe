import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";

import { ButtonVariant } from "~/common/enums/index";
import { useModal } from "~/common/hooks/index";
import { useAgreePolicyMutation } from "~/redux/user/user-api";

import { Button, Checkbox } from "../index";
import styles from "./styles.module.scss";

type ModalProperties = {
	isOpen: boolean;
	onClose: () => void;
};

const PrivacyPolicyModal: React.FC<ModalProperties> = ({ isOpen, onClose }) => {
	const { preventModalCloseOnClick } = useModal({
		isOpen,
		onClose,
	});

	const [isPolicyAgreed, setIsPolicyAgreed] = useState(false);
	const [serverError, setServerError] = useState("");
	const [agreePolicy, { error, isSuccess }] = useAgreePolicyMutation();

	const handleCheckBoxChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setIsPolicyAgreed(e.target.checked);
		},
		[],
	);

	const handleAgreePrivacyPolicy = useCallback(async () => {
		setServerError("");
		await agreePolicy({ consent: true });
	}, [agreePolicy]);

	useEffect(() => {
		if (error) {
			const loadError = ((error as FetchBaseQueryError).data as {
				detail: string;
			})
				? ((error as FetchBaseQueryError).data as { detail: string })
				: { detail: "Виникла невідома помилка" };
			setServerError(loadError.detail);
		}

		if (isSuccess) {
			onClose();
		}
	}, [error, isSuccess, onClose]);

	const handleRejectPrivacyPolicy = useCallback(() => {
		setIsPolicyAgreed(false);
		onClose();
	}, [onClose]);

	if (!isOpen) {
		return null;
	}

	return (
		<div
			className={styles["privacy_policy"]}
			onClick={preventModalCloseOnClick}
		>
			<div className={styles["privacy_policy__content"]} tabIndex={-1}>
				<div className={styles["privacy_policy__content-info"]}>
					<h1 className={styles["privacy_policy__content-info-title"]}>
						Політика конфіденційності
					</h1>
					<div className={styles["privacy_policy__content-info-text"]}>
						<p
							className={styles["privacy_policy__content-info-text-paragraph"]}
						>
							Використання Сайту передбачає повну та безумовну згоду Користувача
							з цією політикою конфіденційності та обробкою його персональних
							даних з метою та на умовах зазначених в Угоді
						</p>
						<ol className={styles["privacy_policy__content-info-text-list"]}>
							<li>
								Користувач Сайту, публікуючи матеріали та/або дані на Сайті,
								добровільно надає Компанії, а також третім особам, які мають
								доступ до цього Сайту, свою безумовну згоду на обробку своїх
								персональних даних.
							</li>
							<li>
								Обробка Персональних даних містить будь-які дії та/або
								сукупність дій, що пов&apos;язані зі збором, реєстрацією,
								накопиченням, зберіганням, адаптацією, змінами, оновленням,
								використанням та розповсюдженням (реалізації, передачі),
								видаленням Персональних даних Користувача з метою забезпечення
								роботи сервісів Сайту.
							</li>
							<li>
								Об&apos;єм Персональних даних Користувача, стосовно яких
								відбувається обробка та які можуть бути включені в бази
								персональних даних, визначаються як будь-яка інформація про
								Користувача, яка стає відомою Компанії, а також будь-яким третім
								особам, які викоростувають Сайт.
							</li>
							<li>
								{`Згода Користувача на обробку його персональних даних не потребує
								від Компанії додаткових сповіщень з приводу передачі його
								персональних даних третім особам відповідно до норм ст.21 Закону
								України "Про захист персональних даних".`}
							</li>
							<li>
								{`Погоджуючись з даною Угодою, Користувач затверджує, що йому
								зрозумілі його права, визначені Законом України "Про захист
								персональних даних", а також з якою метою відбувається збір,
								зберігання та обробка його персональних даних. Користувач також
								надає згоду на те, що період обробки його персональних даних
								безстроковий.`}
							</li>
							<li>
								Збір, зберігання та обробка персональних даних відбувається з
								метою надання Користувачу персоналізованих сервісів Сайту,
								зокрема: доступ до особистого кабінету, авторизація, нагадування
								паролю, розміщення інформації, таргетування рекламних
								матеріалів, відправлення сповіщень, запитів та інформації, що
								стосуються використання Сайту, надання послуг, та інші сервіси
								Сайту.
							</li>
						</ol>
					</div>
					<div className={styles["privacy_policy__content-form"]}>
						<Checkbox
							label="З політикою конфіденційності Сайту ознайомлений(а)"
							name="privacy-policy"
							onChange={handleCheckBoxChange}
						/>
					</div>
				</div>
				{serverError && (
					<p className={styles["privacy_policy__content-error"]}>
						{serverError}
					</p>
				)}
				<div className={styles["privacy_policy__content-buttons"]}>
					<Button
						className={clsx(
							styles["privacy_policy__content-buttons-button"],
							styles["privacy_policy__content-buttons-button-reject"],
						)}
						disabled={isSuccess}
						onClick={handleRejectPrivacyPolicy}
						variant={ButtonVariant.PRIMARY}
					>
						Відхилити
					</Button>
					<Button
						className={styles["privacy_policy__content-buttons-button"]}
						disabled={!isPolicyAgreed}
						onClick={handleAgreePrivacyPolicy}
						variant={ButtonVariant.PRIMARY}
					>
						Прийняти
					</Button>
				</div>
			</div>
		</div>
	);
};

export { PrivacyPolicyModal };
