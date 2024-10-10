import DOMPurify from "dompurify";
import React, { useState } from "react";

import styles from "./styles.module.scss";

interface ExpandableDescriptionProps {
	description: string[];
	maxLength: number;
	startIndex?: number;
}

const INDEX_ZERO = 0;

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
	description,
	maxLength,
	startIndex = INDEX_ZERO,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const toggleDescription = () => {
		setIsExpanded((prev) => !prev);
	};

	const sanitizedDescriptions = description.map((htmlContent) =>
		DOMPurify.sanitize(htmlContent),
	);
	const joinedDescriptions = sanitizedDescriptions.join("");
	const isDescriptionTooLong = joinedDescriptions.trim().length > maxLength;

	return (
		<div className={styles["expandable-description"]}>
			<div className={styles["expandable-description__text"]}>
				{isExpanded ? (
					<div dangerouslySetInnerHTML={{ __html: joinedDescriptions }} />
				) : (
					<div
						dangerouslySetInnerHTML={{
							__html: `${joinedDescriptions.trim().substring(startIndex, maxLength)}${isDescriptionTooLong ? "..." : ""}`,
						}}
					/>
				)}
				{isDescriptionTooLong && (
					<span
						className={styles["expandable-description__toggle"]}
						onClick={toggleDescription}
					>
						{isExpanded ? " Сховати" : " Показати більше"}
					</span>
				)}
			</div>
		</div>
	);
};

export { ExpandableDescription };
