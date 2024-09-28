import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Spinner } from "~/common/components/index";
import { AppRoute, SpinnerVariant } from "~/common/enums/index";
import { useLazyLoginQuery } from "~/redux/auth/auth-api";
import { setTokens, setUser } from "~/redux/auth/auth-slice";

import styles from "./styles.module.scss";

const AuthSuccess: React.FC = () => {
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const code = queryParams.get("code");
	const state = queryParams.get("state");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [serverError, setServerError] = useState("");

	const [login, { data, isLoading }] = useLazyLoginQuery();

	const sendCode = useCallback(
		async (code: string, state: string) => {
			if (code && state) {
				try {
					const { data } = await login({ code, state });

					if (data) {
						void dispatch(setUser(data?.user_info));
						void dispatch(
							setTokens({
								access: data?.access,
								refresh: data?.refresh,
							}),
						);
						navigate(AppRoute.ROOT);
					}
				} catch (error: unknown) {
					const loadError = ((error as FetchBaseQueryError).data as {
						detail: string;
					})
						? ((error as FetchBaseQueryError).data as { detail: string })
						: { detail: "Виникла невідома помилка" };
					setServerError(loadError?.detail);
				}
			}
		},
		[dispatch, login, navigate],
	);

	useEffect(() => {
		if (code && state) {
			sendCode(code, state);
		}
	}, [code, state, sendCode]);

	return (
		<div className={styles["auth_page"]}>
			{isLoading && <Spinner variant={SpinnerVariant.MEDIUM} />}
			{data && <p>Success!</p>}
			{serverError && (
				<p className={styles["auth__form_error"]}>{serverError}</p>
			)}
		</div>
	);
};

export { AuthSuccess };
