import React from "react";

import { type Category } from "~/common/types/index";

import { CompanyCategory } from "./components/index";
import styles from "./styles.module.scss";

type Properties = {
	categories: Category[];
	onSelectCategory: (categoryId: number) => void;
	selectedCategoriesIds: number[];
};

const CompaniesCategories: React.FC<Properties> = ({
	categories,
	onSelectCategory,
	selectedCategoriesIds,
}) => {
	return (
		<div className={styles["companies_categories__container"]}>
			<p className={styles["companies_categories__text"]}>Company Type</p>
			<div className={styles["companies_categories__content"]}>
				{categories.map((category) => (
					<CompanyCategory
						category={category}
						isSelected={selectedCategoriesIds.includes(category.id)}
						key={category.id}
						onSelectCategory={onSelectCategory}
					/>
				))}
			</div>
		</div>
	);
};

export { CompaniesCategories };
