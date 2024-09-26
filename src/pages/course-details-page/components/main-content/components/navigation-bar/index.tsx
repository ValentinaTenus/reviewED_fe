import { useState } from "react";
import React from "react";

import styles from "./styles.module.scss";

type NavBarProperties = {
	aboutCourse: React.RefObject<HTMLDivElement>;
	aboutCompany: React.RefObject<HTMLDivElement>;
};

const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
	if (sectionRef.current) {
		sectionRef.current.scrollIntoView({ behavior: "smooth" });
	}
};

const NavBar: React.FC<NavBarProperties> = ({ aboutCourse, aboutCompany }) => {
	const [active, setActive] = useState("Про курс");

	return (
		<nav className={styles["navbar__wrapper"]}>
			<ul className={styles["navbar"]}>
				<li
					className={`${styles["navbar__item"]} ${active === "Про курс" ? styles["item_active"] : ""}`}
					onClick={() => {
						setActive("Про курс");
						scrollToSection(aboutCourse);
					}}
				>
					Про курс
				</li>
				<li
					className={`${styles["navbar__item"]} ${active === "Про компанію" ? styles["item_active"] : ""}`}
					onClick={() => {
						setActive("Про компанію");
						scrollToSection(aboutCompany);
					}}
				>
					Про компанію
				</li>
			</ul>
		</nav>
	);
};

export { NavBar };
