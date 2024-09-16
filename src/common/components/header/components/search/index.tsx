import React from "react";

import { Input } from "~/common/components/index";
import { IconName } from "~/common/enums/index";
import { useAppForm } from "~/common/hooks/index";

import styles from "./styles.module.scss";

const Search: React.FC = () => {
	const { control, errors } = useAppForm({
		defaultValues: {
			search: "",
		},
	});

	return (
		<form className={styles["search"]}>
			<Input
				control={control}
				errors={errors}
				hasVisuallyHiddenLabel
				iconName={IconName.SEARCH}
				name="search"
				placeholder="Пошук"
				type="text"
			/>
		</form>
	);
};

export { Search };
