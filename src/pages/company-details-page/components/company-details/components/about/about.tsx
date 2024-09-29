import React from "react";
import { Link } from "react-router-dom";

import { Company } from "~/common/types";

import styles from "./styles.module.scss";

const About = React.forwardRef<HTMLDivElement, { company: Company }>(
	({ company }, ref) => {
		const MIN_SUBCATEGORIES = 0;

		return (
			<>
				<div className={styles["about"]} ref={ref}>
					<h2 className={styles["about_heading"]}>Про компанію</h2>
					<p className={styles["p-sb"]}>{company.description}</p>
				</div>
				<div className={styles["categories"]}>
					<h3 className={styles["categories_heading"]}>
						Категорії курсів компанії
					</h3>
					<ul className={styles["categories-list"]}>
						{company.categories.map((category, index) => (
							<li className={styles["category_name"]} key={index}>
								{category.name}
								{category.subcategories &&
									category.subcategories.length > MIN_SUBCATEGORIES && (
										<ul className={styles["subcategories_list"]}>
											{category.subcategories.map((subcategory, subIndex) => (
												<Link
													className={styles["subcategory_name"]}
													key={subIndex}
													to="#"
												>
													{subcategory.name}
												</Link>
											))}
										</ul>
									)}
							</li>
						))}
					</ul>
				</div>
			</>
		);
	},
);

About.displayName = "About";

export { About };