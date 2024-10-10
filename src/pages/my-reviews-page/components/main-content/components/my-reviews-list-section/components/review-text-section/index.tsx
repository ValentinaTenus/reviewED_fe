import React, { useCallback, useEffect, useState } from "react";

import { IconsSection } from "../icons-section";
import styles from "./styles.module.scss";

// Constants for breakpoints and max preview lengths
const MAX_PREVIEW_LENGTH_DESKTOP = 200;
const MAX_PREVIEW_LENGTH_MOBILE = 150;
const MAX_PREVIEW_LENGTH_TABLET = 290;
const MAX_PREVIEW_LENGTH_LARGE_SCREEN = 350;
const MAX_PREVIEW_LENGTH_EXTRA_LARGE = 190;
const MOBILE_BREAKPOINT = 576;
const TABLET_BREAKPOINT = 630;
const LARGE_SCREEN_BREAKPOINT = 888;
const ZERO_NUMBER = 0;

type Properties = {
	handleClickEditReview: (id: number) => void;
	id: number;
	likesCount: number;
	text: string;
};

const ReviewTextSection: React.FC<Properties> = ({
	handleClickEditReview,
	id,
	likesCount,
	text,
}) => {
	const [showFullText, setShowFullText] = useState(false);
	const [maxPreviewLength, setMaxPreviewLength] = useState(
		MAX_PREVIEW_LENGTH_DESKTOP,
	);

	const toggleText = useCallback(
		() => setShowFullText(!showFullText),
		[showFullText],
	);

	const handleResize = useCallback(() => {
		const width = window.innerWidth;

		if (width <= MOBILE_BREAKPOINT) {
			setMaxPreviewLength(MAX_PREVIEW_LENGTH_MOBILE);
		} else if (width <= TABLET_BREAKPOINT) {
			setMaxPreviewLength(MAX_PREVIEW_LENGTH_TABLET);
		} else if (width <= LARGE_SCREEN_BREAKPOINT) {
			setMaxPreviewLength(MAX_PREVIEW_LENGTH_LARGE_SCREEN);
		} else {
			setMaxPreviewLength(MAX_PREVIEW_LENGTH_EXTRA_LARGE);
		}
	}, []);

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [handleResize]);

	return (
		<div className={styles["review-text"]}>
			{showFullText ? (
				<>
					<span>{text}</span>
					<p className={styles["review-text__close"]} onClick={toggleText}>
						Закрити
					</p>
					<div className={styles["review-text__icons"]}>
						<IconsSection
							handleClickEdit={handleClickEditReview}
							likesCount={likesCount}
							reviewId={id}
							withEditIcon
						/>
					</div>
				</>
			) : (
				<>
					{text.length > maxPreviewLength ? (
						<>
							{text.slice(ZERO_NUMBER, maxPreviewLength)}
							<span
								className={styles["review-text__more-details"]}
								onClick={toggleText}
							>
								... Детальніше
							</span>
						</>
					) : (
						<>
							<span className={styles["review-text__full-text"]}>{text}</span>
							<div className={styles["review-text__full-text-icons"]}>
								<IconsSection
									handleClickEdit={handleClickEditReview}
									likesCount={likesCount}
									reviewId={id}
									withEditIcon
								/>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export { ReviewTextSection };
