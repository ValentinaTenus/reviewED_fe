import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import AuthImage from "~/assets/images/auth-image.png";
import Logo from "~/assets/images/logo.svg?react";
import { Button, Icon, Spinner } from "~/common/components/index";
import {
	AppRoute,
	ButtonVariant,
	IconName,
	SpinnerVariant,
} from "~/common/enums/index";
import { useLazyGetLoginUrlQuery } from "~/redux/auth/auth-api";

import styles from "./styles.module.scss";

const AuthPage: React.FC = () => {
	const [getAuthUrl, { isLoading }] = useLazyGetLoginUrlQuery();
	const [serverError, setServerError] = useState("");

	const handleLogin = useCallback(async () => {
		try {
			const response = await getAuthUrl(undefined).unwrap();

			if (response.url) {
				window.location.href = response.url;
			}
		} catch (error: unknown) {
			const loadError = ((error as FetchBaseQueryError).data as {
				detail: string;
			})
				? ((error as FetchBaseQueryError).data as { detail: string })
				: { detail: "Виникла невідома помилка" };
			setServerError(loadError?.detail);
		}
	}, [getAuthUrl]);

	return (
		<div className={styles["auth_page"]}>
			<div className={styles["auth_image__container"]}>
				<img
					alt="auth-image"
					className={styles["auth__image"]}
					src={AuthImage}
				/>
			</div>
			<div className={styles["auth_form__container"]}>
				<Link
					className={styles["auth_form__logo_container"]}
					to={AppRoute.ROOT}
				>
					<Logo className={styles["auth_form__logo"]} />
				</Link>
				<h2 className={styles["auth__form_title"]}>Авторизація</h2>
				<Button
					aria-label="Login with LinkedIn"
					className={styles["auth__form_button"]}
					disabled={isLoading}
					onClick={handleLogin}
					prependedIcon={
						!isLoading && (
							<Icon
								className={styles["auth__form_button_icon"]}
								name={IconName.LINKEDIN_LOGO}
							/>
						)
					}
					variant={ButtonVariant.SHARE_LINKEDIN}
				>
					{isLoading ? (
						<Spinner variant={SpinnerVariant.SMALL} />
					) : (
						"Ввійти із LinkedIn"
					)}
				</Button>
				{serverError && (
					<p className={styles["auth__form_error"]}>{serverError}</p>
				)}
			</div>
		</div>
	);
};

export { AuthPage };
