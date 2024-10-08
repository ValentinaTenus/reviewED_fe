import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
	BreadCrumb,
	Button,
	Checkbox,
	Footer,
	Header,
	Icon,
} from "~/common/components/index";
import {
	AppRoute,
	ButtonSize,
	ButtonVariant,
	IconName,
} from "~/common/enums/index";
import { useAppSelector } from "~/redux/hooks.type";
import { useAgreePolicyMutation } from "~/redux/user/user-api";

import styles from "./styles.module.scss";

const BreadCrumbPaths = [
	{
		label: "Головна сторінка",
		path: AppRoute.ROOT,
	},
	{
		label: "Політика конфіденційності",
	},
];

const PrivacyPolicyPage: React.FC = () => {
	const navigate = useNavigate();

	const [isPolicyAgreed, setIsPolicyAgreed] = useState(false);
	const [serverError, setServerError] = useState("");
	const [agreePolicy, { error, isSuccess }] = useAgreePolicyMutation();

	const { user } = useAppSelector((state) => state.auth);

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
	}, [error]);

	const handleRejectPrivacyPolicy = useCallback(() => {
		setIsPolicyAgreed(false);
	}, []);

	const handleRedirectToMainPage = useCallback(() => {
		navigate(AppRoute.ROOT);
	}, [navigate]);

	return (
		<div className={styles["privacy_policy_page"]}>
			<Header />
			<div className={styles["privacy_policy"]}>
				<BreadCrumb items={BreadCrumbPaths} />
				<div className={styles["privacy_policy__content"]}>
					<div className={styles["privacy_policy__content-info"]}>
						<h1 className={styles["privacy_policy__content-info-title"]}>
							Політика конфіденційності
						</h1>
						<div className={styles["privacy_policy__content-info-text"]}>
							<p
								className={
									styles["privacy_policy__content-info-text-paragraph"]
								}
							>
								Використання Сайту передбачає повну та безумовну згоду
								Користувача з цією політикою конфіденційності та обробкою його
								персональних даних з метою та на умовах зазначених в Угоді
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
									Користувача, яка стає відомою Компанії, а також будь-яким
									третім особам, які викоростувають Сайт.
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
									зокрема: доступ до особистого кабінету, авторизація,
									нагадування паролю, розміщення інформації, таргетування
									рекламних матеріалів, відправлення сповіщень, запитів та
									інформації, що стосуються використання Сайту, надання послуг,
									та інші сервіси Сайту.
								</li>
							</ol>
						</div>
						{user && !user.policy_agreed && !isSuccess && (
							<div className={styles["privacy_policy__content-form"]}>
								<Checkbox
									label="З політикою конфіденційності Сайту ознайомлений(а)"
									name="privacy-policy"
									onChange={handleCheckBoxChange}
								/>
							</div>
						)}
					</div>
					{serverError && (
						<p className={styles["privacy_policy__content-error"]}>
							{serverError}
						</p>
					)}
					{user && user.policy_agreed && (
						<Button
							appendedIcon={
								<Icon
									className={styles["privacy_policy__content-button-icon"]}
									name={IconName.ARROW_RIGHT}
								/>
							}
							className={styles["privacy_policy__content-button"]}
							onClick={handleRedirectToMainPage}
							size={ButtonSize.MEDIUM}
							variant={ButtonVariant.PRIMARY}
						>
							Перейти на головну сторінку
						</Button>
					)}
					{user && !user.policy_agreed && !isSuccess && (
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
					)}
				</div>
			</div>
			<Footer />
		</div>
	);
};

export { PrivacyPolicyPage };
