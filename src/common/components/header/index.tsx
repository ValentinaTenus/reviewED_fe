import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "~/assets/images/logo.svg?react";
import LogOutIcon from "~/assets/images/logout.svg?react";
import MenuIcon from "~/assets/images/menu.svg?react";
import UserIcon from "~/assets/images/user.svg?react";
import { Button, IconButton } from "~/common/components/index";
import { AppRoute, ButtonVariant } from "~/common/enums/index";
import { useLazyLogOutQuery } from "~/redux/auth/auth-api";
import { logout } from "~/redux/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks.type";

import { BurgerMenu } from "./components/index";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [serverError, setServerError] = useState("");

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { refresh, user } = useAppSelector((state) => state.auth);

	const [userLogout] = useLazyLogOutQuery();

	const handleToggleMenu = useCallback(() => {
		setIsMenuOpen(!isMenuOpen);
	}, [isMenuOpen]);

	const handleRedirectToLogin = useCallback(() => {
		navigate(AppRoute.AUTH);
	}, [navigate]);

	const handleLogOut = useCallback(async () => {
		setIsMenuOpen(false);

		if (user && refresh) {
			try {
				const response = await userLogout({ refresh });

				if (response?.isSuccess) {
					void dispatch(logout());
				} else if (response?.error) {
					throw new Error(
						(response.error as { error: string }).error || "Hевідома помилка",
					);
				}
			} catch (error: unknown) {
				const loadError = ((error as FetchBaseQueryError).data as {
					detail: string;
				})
					? ((error as FetchBaseQueryError).data as { detail: string })
					: { detail: (error as Error).message };
				setServerError(loadError?.detail);
			}
		}
	}, [dispatch, refresh, user, userLogout]);

	return (
		<div className={styles["header_wrapper"]}>
			<div className={styles["header_content"]}>
				<div className={styles["header_logo_container"]}>
					<Link className={styles["header_logo"]} to={AppRoute.ROOT}>
						<Logo />
					</Link>
				</div>
				<div className={styles["header__button_container"]}>
					{!user && (
						<>
							<Button
								className={styles["header__button"]}
								onClick={handleRedirectToLogin}
								variant={ButtonVariant.LOGIN}
							>
								Вхід
							</Button>
							<IconButton
								className={styles["menu__button"]}
								onClick={handleToggleMenu}
							>
								<MenuIcon className={styles["menu__button_icon"]} />
							</IconButton>
							{isMenuOpen && <BurgerMenu onLogin={handleRedirectToLogin} />}
						</>
					)}
					{user && (
						<div className={styles["user__button"]}>
							<IconButton onClick={handleToggleMenu}>
								<UserIcon className={styles["user__button_icon"]} />
							</IconButton>
							{isMenuOpen && (
								<div className={styles["user_menu"]}>
									<ul className={styles["user_menu_list"]}>
										{user.is_staff ? (
											<>
												<li className={styles["user_menu_list_item"]}>
													<Link to={AppRoute.MODERATORS_PAGE}>
														Модерація відгуків
													</Link>
												</li>
												<li className={styles["user_menu_list_item"]}>
													<Link to={AppRoute.USER_REQUESTS}>
														Звернення користувачів
													</Link>
												</li>
											</>
										) : (
											<li className={styles["user_menu_list_item"]}>
												<Link to={AppRoute.MY_REVIEWS_PAGE}>Ваші відгуки</Link>
											</li>
										)}
										<li className={styles["user_menu_list_item"]}>
											<Button
												className={styles["logout__button"]}
												onClick={handleLogOut}
												prependedIcon={<LogOutIcon />}
												variant={ButtonVariant.DEFAULT}
											>
												Вийти
											</Button>
										</li>
									</ul>
								</div>
							)}
						</div>
					)}
					{serverError && <p className={styles["error"]}>{serverError}</p>}
				</div>
			</div>
		</div>
	);
};

export { Header };
