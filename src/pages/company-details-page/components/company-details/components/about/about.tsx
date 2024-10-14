import clsx from "clsx";
import DOMPurify from "dompurify";
import React from "react";
import { Link } from "react-router-dom";

import { AppRoute } from "~/common/enums";
import { type GetCompanyByIdResponse } from "~/common/types";
import globalStyles from "~/pages/company-details-page/components/company-details/styles.module.scss";

import styles from "./styles.module.scss";

const About = React.forwardRef<
	HTMLDivElement,
	{ company: GetCompanyByIdResponse }
>(({ company }, ref) => {
	const MIN_SUBCATEGORIES = 0;
	const sanitizedDescriptions = company.description.map((htmlContent) =>
		DOMPurify.sanitize(htmlContent),
	);

	return (
		<>
			<div className={styles["about"]} ref={ref}>
				<h2 className={styles["about_heading"]}>Про компанію</h2>
				<div
					className={clsx(globalStyles["p-sb"], styles["about_text"])}
					dangerouslySetInnerHTML={{ __html: sanitizedDescriptions.join("") }}
				/>
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
												to={`${AppRoute.ALL_COURSES}?subcategory=${subcategory.id}`}
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
});

About.displayName = "About";

export { About };
