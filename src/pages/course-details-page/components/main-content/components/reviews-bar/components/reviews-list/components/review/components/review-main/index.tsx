import React, { useRef, useState } from "react";

import { Button } from "~/common/components";
import { ButtonSize, ButtonVariant } from "~/common/enums";

import styles from "./styles.module.scss";

type ReviewMainProperties = {
	text: string;
};

const ReviewMain: React.FC<ReviewMainProperties> = ({ text }) => {
	const textRef = useRef(null);

	const [isFullTextShown, setIsFullTextShown] = useState(false);

	const currentRef = textRef.current;

	const isTextOverflowed =
		currentRef &&
		(currentRef as HTMLElement).scrollHeight >
			(currentRef as HTMLElement).clientHeight;

	const defineTextHeight = () => {
		if (isFullTextShown) {
			if (currentRef)
				(currentRef as HTMLElement).style.setProperty("max-height", "none");
		} else {
			if (currentRef)
				(currentRef as HTMLElement).style.setProperty("max-height", "180px");
		}
	};

	const handleTextResize = () => {
		setIsFullTextShown(!isFullTextShown);
		defineTextHeight();
	};

	defineTextHeight();

	return (
		<div className={styles["review__main"]}>
			<section className={styles["review__text"]} ref={textRef}>
				{text}
			</section>
			{(isTextOverflowed || isFullTextShown) && (
				<Button
					className={styles["review__button"]}
					onClick={() => handleTextResize()}
					size={ButtonSize.SMALL}
					variant={ButtonVariant.DEFAULT}
				>
					{isFullTextShown ? "Сховати" : "Показати повністю"}
				</Button>
			)}
		</div>
	);
};

export { ReviewMain };
