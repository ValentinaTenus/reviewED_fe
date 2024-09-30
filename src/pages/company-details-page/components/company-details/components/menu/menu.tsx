import React, { useState } from "react";

import styles from "./styles.module.scss";

const Menu: React.FC<{
	aboutRef: React.RefObject<HTMLDivElement>;
	contactsRef: React.RefObject<HTMLDivElement>;
	coursesRef: React.RefObject<HTMLDivElement>;
	reviewsRef: React.RefObject<HTMLDivElement>;
}> = ({ aboutRef, contactsRef, coursesRef, reviewsRef }) => {
	const [active, setActive] = useState("Контакти");

	const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
		if (sectionRef.current) {
			sectionRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<>
			<nav className={styles["menu"]}>
				<ul className={styles["menu_list"]}>
					<li
						className={`${styles["menu_item"]} ${active === "Контакти" ? styles["item_active"] : ""}`}
						onClick={() => {
							setActive("Контакти");
							scrollToSection(contactsRef);
						}}
					>
						Контакти
					</li>
					<li
						className={`${styles["menu_item"]} ${active === "Про компанію" ? styles["item_active"] : ""}`}
						onClick={() => {
							setActive("Про компанію");
							scrollToSection(aboutRef);
						}}
					>
						Про компанію
					</li>
					<li
						className={`${styles["menu_item"]} ${active === "Курси" ? styles["item_active"] : ""}`}
						onClick={() => {
							setActive("Курси");
							scrollToSection(coursesRef);
						}}
					>
						Курси
					</li>
					<li
						className={`${styles["menu_item"]} ${active === "Відгуки" ? styles["item_active"] : ""}`}
						onClick={() => {
							setActive("Відгуки");
							scrollToSection(reviewsRef);
						}}
					>
						Відгуки
					</li>
				</ul>
			</nav>
		</>
	);
};

export { Menu };
