import React, { useState } from "react";

import styles from "./styles.module.scss";

interface ExpandableDescriptionProps {
	description: string;
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

	return (
		<div className={styles["expandable-description"]}>
			<div>
				{isExpanded ? (
					<p
						className={styles["expandable-description__text"]}
						dangerouslySetInnerHTML={{ __html: description }}
					/>
				) : (
					<p
						className={styles["expandable-description__text"]}
						dangerouslySetInnerHTML={{
							__html: `${description.substring(startIndex, maxLength)}...`,
						}}
					/>
				)}
				<span
					className={styles["expandable-description__toggle"]}
					onClick={toggleDescription}
				>
					{isExpanded ? " Сховати" : " Показати більше"}
				</span>
			</div>
		</div>
	);
};

export { ExpandableDescription };
