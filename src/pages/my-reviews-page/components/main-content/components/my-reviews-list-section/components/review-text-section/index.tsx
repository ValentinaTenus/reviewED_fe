import clsx from "clsx";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { ActionIconsPanel } from "../index";
import styles from "./styles.module.scss";

const COLLAPSED_TEXT_HEIGHT = 80;

type Properties = {
	id: number;
	likesCount: number;
	openModal: (currentModal: string, entityId: number) => void;
	text: string;
};

const ReviewTextSection: React.FC<Properties> = ({
	id,
	likesCount,
	openModal,
	text,
}) => {
	const [showFullText, setShowFullText] = useState(false);
	const [isTextTruncated, setIsTextTruncated] = useState(false);

	const textRef = useRef<HTMLDivElement>(null);

	const toggleText = useCallback(() => {
		setShowFullText(!showFullText);
	}, [showFullText]);

	const checkTextOverflow = useCallback(() => {
		if (textRef.current) {
			const isOverflowing =
				textRef.current.scrollHeight > COLLAPSED_TEXT_HEIGHT;

			if (!isOverflowing) {
				setShowFullText(false);
			}

			setIsTextTruncated(isOverflowing);
		}
	}, []);

	useEffect(() => {
		checkTextOverflow();
	}, [text, checkTextOverflow]);

	useEffect(() => {
		window.addEventListener("resize", checkTextOverflow);
		return () => {
			window.removeEventListener("resize", checkTextOverflow);
		};
	}, [checkTextOverflow]);

	return (
		<div className={styles["review-text"]}>
			<div
				className={clsx(styles["review-text__text"], {
					[styles["review-text__text--full"]]: showFullText,
				})}
				ref={textRef}
			>
				{text}
			</div>
			{!showFullText && isTextTruncated && (
				<span
					className={styles["review-text__more-details"]}
					onClick={toggleText}
				>
					<span>...</span> Детальніше
				</span>
			)}

			{showFullText && (
				<span className={styles["review-text__close"]} onClick={toggleText}>
					Закрити
				</span>
			)}

			{(showFullText || !isTextTruncated) && (
				<div className={styles["review-text__full-text-icons"]}>
					<ActionIconsPanel
						likesCount={likesCount}
						openModal={openModal}
						reviewId={id}
						showEditIcon
					/>
				</div>
			)}
		</div>
	);
};

export { ReviewTextSection };
