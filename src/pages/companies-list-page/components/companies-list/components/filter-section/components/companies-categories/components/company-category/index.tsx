import clsx from "clsx";
import React, { useCallback, useState } from "react";

import { Button } from "~/common/components/index";
import { ButtonVariant } from "~/common/enums/index";
import { type Category } from "~/common/types/index";

import styles from "./styles.module.scss";

type Properties = {
	category: Category;
	onSelectCategory: (categoryId: number) => void;
};

const CompanyCategory: React.FC<Properties> = ({
	category,
	onSelectCategory,
}) => {
	const [isSelected, setIsSelected] = useState(false);

	const handleSelectCategory = useCallback(() => {
		onSelectCategory(category.id);
		setIsSelected((prevIsSelected) => !prevIsSelected);
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
