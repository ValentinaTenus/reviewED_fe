import React from "react";

import styles from "./styles.module.scss";

type DescriptionSectionProperties = {
	description: HTMLElement[];
};

const DescriptionSection: React.FC<DescriptionSectionProperties> = ({
	description,
}) => {
	return (
		<ul className={styles["description"]}>
			{description?.map((htmlContent, index) => (
				<li dangerouslySetInnerHTML={{ __html: htmlContent }} key={index} />
			))}
		</ul>
	);
};

export { DescriptionSection };
