import React from "react";

import styles from "./styles.module.scss";

const INDEX_ONE = 1;

type DescriptionSectionProperties = {
	description: string;
};

const DescriptionSection: React.FC<DescriptionSectionProperties> = ({
	description,
}) => {
	const paragraphs = description.split("\n\n");

	return (
		<ul className={styles["description"]}>
			{paragraphs.map((paragraph, index) => (
				<li key={index}>
					{paragraph.split("\n").map((line, i) => (
						<React.Fragment key={i}>
							{line}
							{i < paragraph.split("\n").length - INDEX_ONE && <br />}
						</React.Fragment>
					))}
				</li>
			))}
		</ul>
	);
};

export { DescriptionSection };
