import React, { useCallback, useState } from "react";

import Logo from "~/assets/images/logo.svg?react";
import LogOutIcon from "~/assets/images/logout.svg?react";
import MenuIcon from "~/assets/images/menu.svg?react";
import UserIcon from "~/assets/images/user.svg?react";
import { Button, IconButton } from "~/common/components/index";
import { ButtonVariant } from "~/common/enums/index";

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
					<div className={styles["header_logo"]}>
						<Logo />
					</div>
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
								<MenuIcon />
							</IconButton>
							{isMenuOpen && <BurgerMenu />}
						</>
					)}
					{user && (
						<div className={styles["user__button"]}>
							<IconButton onClick={handleToggleMenu}>
								<UserIcon />
							</IconButton>
							{isMenuOpen && (
								<div className={styles["user_menu"]}>
									<ul className={styles["user_menu_list"]}>
										<li>
											<a href="#">Ваші відгуки</a>
										</li>
										<li>
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
