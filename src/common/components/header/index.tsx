import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "~/assets/images/logo.svg?react";
import LogOutIcon from "~/assets/images/logout.svg?react";
import MenuIcon from "~/assets/images/menu.svg?react";
import UserIcon from "~/assets/images/user.svg?react";
import { Button, IconButton } from "~/common/components/index";
import { AppRoute, ButtonVariant } from "~/common/enums/index";

import { BurgerMenu, Search } from "./components/index";
import styles from "./styles.module.scss";

const Header: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const user = true;

	const handleToggleMenu = useCallback(() => {
		setIsMenuOpen(!isMenuOpen);
	}, [isMenuOpen]);

	return (
		<div className={styles["header_wrapper"]}>
			<div className={styles["header_content"]}>
				<div className={styles["header_logo_container"]}>
					<Link className={styles["header_logo"]} to={AppRoute.ROOT}>
						<Logo />
					</Link>
					<div className={styles["header_search"]}>
						<Search />
					</div>
				</div>
				<div>
					{!user && (
						<>
							<Button
								className={styles["header__button"]}
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
							{isMenuOpen && <BurgerMenu />}
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
										<li className={styles["user_menu_list_item"]}>
											<a href="#">Ваші відгуки</a>
										</li>
										<li className={styles["user_menu_list_item"]}>
											<a href="#">
												<LogOutIcon />
												Вийти
											</a>
										</li>
									</ul>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export { Header };
