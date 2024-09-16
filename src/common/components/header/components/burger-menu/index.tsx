import React from "react";

import { Button } from "~/common/components";
import { ButtonVariant } from "~/common/enums";

import { Search } from "../index";
import styles from "./styles.module.scss";

const BurgerMenu: React.FC = () => {
	return (
		<div className={styles["user_menu_wrapper"]}>
			<div className={styles["user_menu"]}>
				<Search />
				<ul className={styles["user_menu__list"]}>
					<li>Курси</li>
					<li>Компанії</li>
				</ul>
			</div>
			<div className={styles["user_menu__button"]}>
				<Button isFullWidth variant={ButtonVariant.LOGIN}>
					Вхід
				</Button>
			</div>
		</div>
	);
};

export { BurgerMenu };
