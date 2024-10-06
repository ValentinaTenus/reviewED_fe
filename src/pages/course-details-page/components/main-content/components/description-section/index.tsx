import React from "react";

import styles from "./styles.module.scss";

type DescriptionSectionProperties = {
	description: string;
};

const DescriptionSection: React.FC<DescriptionSectionProperties> = ({
	description,
}) => {
	return <div className={styles["description"]}>{description}</div>;
};

export { DescriptionSection };
