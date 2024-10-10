import DOMPurify from "dompurify";
import React from "react";

import styles from "./styles.module.scss";

type DescriptionSectionProperties = {
	description: string;
};

const DescriptionSection: React.FC<DescriptionSectionProperties> = ({
	description,
}) => {
	const sanitizedDescription = DOMPurify.sanitize(description);

	// Remove unnecessary commas and whitespace between tags
	const cleanedDescription = sanitizedDescription.replace(/>,\s*</g, "><");

	return (
		<div
			className={styles["description"]}
			dangerouslySetInnerHTML={{ __html: cleanedDescription }}
		/>
	);
};

export { DescriptionSection };
