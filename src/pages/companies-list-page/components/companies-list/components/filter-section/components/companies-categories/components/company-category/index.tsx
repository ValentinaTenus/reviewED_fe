import clsx from "clsx";
import React, { useCallback } from "react";

import { Button } from "~/common/components/index";
import { ButtonVariant } from "~/common/enums/index";
import { type Category } from "~/common/types/index";

import styles from "./styles.module.scss";

type Properties = {
	category: Category;
	isSelected: boolean;
	onSelectCategory: (categoryId: number) => void;
};

const CompanyCategory: React.FC<Properties> = ({
	category,
	isSelected,
	onSelectCategory,
}) => {
	const handleSelectCategory = useCallback(() => {
		onSelectCategory(category.id);
	}, [category.id, onSelectCategory]);

	return (
		<div key={category.id}>
			<Button
				className={clsx(
					styles["companies_categories__item"],
					isSelected && styles["companies_categories__item_selected"],
				)}
				onClick={handleSelectCategory}
				variant={ButtonVariant.DEFAULT}
			>
				{category.name}
			</Button>
		</div>
	);
};

export { CompanyCategory };
