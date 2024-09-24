import React, { useState } from "react";

import AuthImage from "~/assets/images/auth-image.png";
import Logo from "~/assets/images/logo.svg?react";
import { Button } from "~/common/components/index";
import { ButtonVariant } from "~/common/enums/index";
import { useLazyLoginQuery } from "~/redux/auth/auth-api";

import styles from "./styles.module.scss";

const AuthPage: React.FC = () => {
	const [auth] = useLazyLoginQuery();
	const [serverError, setServerError] = useState("");

	const handleLogin = async () => {
		try {
			const response = await auth(undefined).unwrap();

			if (response.url) {
				window.location.href = response.url;
			}
		} catch (error: unknown) {
			setServerError((error as Error).message);
		}
	};

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
				<div className={styles["auth_form__logo"]}>
					<Logo />
					<h2 className={styles["auth__form_title"]}>Log in</h2>
					<Button onClick={handleLogin} variant={ButtonVariant.OUTLINED}>
						Linkedin
					</Button>
					{serverError && <p>{serverError}</p>}
				</div>
			</div>
		</div>
	);
};

export { AuthPage };
