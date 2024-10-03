import React from "react";
import { Link } from "react-router-dom";

import { Button } from "~/common/components/index";
import { AppRoute, ButtonVariant } from "~/common/enums/index";

import styles from "./styles.module.scss";

type BurgerMenuProperties = {
	onLogin: () => void;
};

const BurgerMenu: React.FC<BurgerMenuProperties> = ({ onLogin }) => {
	return (
		<div className={styles["user_menu_wrapper"]}>
			<div className={styles["user_menu"]}>
				<ul className={styles["user_menu__list"]}>
					<Link
						className={styles["user_menu__list_item"]}
						to={AppRoute.ALL_COURSES}
					>
						Курси
					</Link>
					<Link
						className={styles["user_menu__list_item"]}
						to={AppRoute.ALL_COMPANIES}
					>
						Компанії
					</Link>
				</ul>
			</div>
			<div className={styles["user_menu__button"]}>
				<Button isFullWidth onClick={onLogin} variant={ButtonVariant.LOGIN}>
					Вхід
				</Button>
			</div>
		</div>
	);
};

export { BurgerMenu };
