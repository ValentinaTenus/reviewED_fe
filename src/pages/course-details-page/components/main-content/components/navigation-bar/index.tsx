import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";

type NavBarProperties = {
	aboutCompany: React.RefObject<HTMLDivElement>;
	aboutCourse: React.RefObject<HTMLDivElement>;
	reviews: React.RefObject<HTMLDivElement>;
};

const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
	if (sectionRef.current) {
		sectionRef.current.scrollIntoView({ behavior: "smooth" });
	}
};

const NavBar: React.FC<NavBarProperties> = ({
	aboutCompany,
	aboutCourse,
	reviews,
}) => {
	const [active, setActive] = useState("Про курс");

	const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
		entries.forEach((entry: IntersectionObserverEntry) => {
			if (entry.isIntersecting) {
				setActive(entry.target.innerHTML);
			}
		});
	};

	useEffect(() => {
		const options = {
			rootMargin: "0px 0px -80% 0px",
			threshold: 0.51,
		};

		const observer = new IntersectionObserver(intersectionCallback, options);

		observer.observe(aboutCompany.current as Element);
		observer.observe(aboutCourse.current as Element);
		observer.observe(reviews.current as Element);

		return () => {
			observer.disconnect();
		};
	}, [active, aboutCompany, aboutCourse, reviews]);

	const handleNavigationClick = (
		activeStateValue: string,
		ref: React.RefObject<HTMLDivElement>,
	) => {
		setActive(activeStateValue);
		scrollToSection(ref);
	};

	return (
		<nav className={styles["navbar__wrapper"]}>
			<ul className={styles["navbar"]}>
				<li
					className={`${styles["navbar__item"]} ${active === "Про курс" ? styles["item_active"] : ""}`}
					onClick={() => {
						handleNavigationClick("Про курс", aboutCourse);
					}}
				>
					Про курс
				</li>
				<li
					className={`${styles["navbar__item"]} ${active === "Про компанію" ? styles["item_active"] : ""}`}
					onClick={() => {
						handleNavigationClick("Про компанію", aboutCompany);
					}}
				>
					Про компанію
				</li>
				<li
					className={`${styles["navbar__item"]} ${active === "Відгуки" ? styles["item_active"] : ""}`}
					onClick={() => {
						handleNavigationClick("Відгуки", reviews);
					}}
				>
					Відгуки
				</li>
			</ul>
		</nav>
	);
};

export { NavBar };
