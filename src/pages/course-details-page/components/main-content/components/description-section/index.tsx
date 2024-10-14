import DOMPurify from "dompurify";
import React from "react";

import styles from "./styles.module.scss";

type DescriptionSectionProperties = {
	description: string[];
};

const DescriptionSection: React.FC<DescriptionSectionProperties> = ({
	description,
}) => {
	const sanitizedDescriptions = description.map((htmlContent) =>
		DOMPurify.sanitize(htmlContent),
	);

	return (
		<div
			className={styles["description"]}
			dangerouslySetInnerHTML={{ __html: sanitizedDescriptions.join("") }}
		/>
	);
};

export { DescriptionSection };
