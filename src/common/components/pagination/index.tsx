import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

import { ButtonVariant, IconName } from "~/common/enums/index";

import { Button, Icon, IconButton } from "../index";
import styles from "./styles.module.scss";

type PaginationProps = {
	defaultCurrentPage: number;
	pages?: number;
	setCurrentPage: (page: number) => void;
};

const DOTS = "...";
const VISIBLE_PAGES = 3;
const INITIAL_THRESHOLD = 2;
const END_THRESHOLD = 2;
const DEFAULT_PAGE_NUMBER = 10;
const FIRST_PAGE = 1;

const INDEX_ZERO = 0;
const INDEX_ONE = 1;
const INDEX_TWO = 2;

const Pagination: React.FC<PaginationProps> = ({
	defaultCurrentPage,
	pages = DEFAULT_PAGE_NUMBER,
	setCurrentPage,
}) => {
	const [currentButton, setCurrentButton] = useState<number | string>(
		defaultCurrentPage,
	);
	const numberOfPages = Array.from({ length: pages }, (_, i) => i + FIRST_PAGE);

	const getDisplayedPages = (
		currentButton: number | string,
		pages: number[],
	) => {
		if (pages.length <= VISIBLE_PAGES) return pages;

		if (+currentButton <= INITIAL_THRESHOLD) {
			return [
				...pages.slice(INDEX_ZERO, INITIAL_THRESHOLD + INDEX_ONE),
				DOTS,
				pages[pages.length - INDEX_ONE],
			];
		}

		if (+currentButton >= pages.length - END_THRESHOLD) {
			return [
				FIRST_PAGE,
				DOTS,
				...pages.slice(pages.length - (END_THRESHOLD + INDEX_ONE)),
			];
		}

		return [
			FIRST_PAGE,
			DOTS,
			...pages.slice(+currentButton - INDEX_TWO, +currentButton + INDEX_ONE),
			DOTS,
			pages[pages.length - INDEX_ONE],
		];
	};

	const displayedPages = useMemo(
		() => getDisplayedPages(currentButton, numberOfPages),
		[currentButton, numberOfPages],
	);

	useEffect(() => {
		setCurrentButton(defaultCurrentPage);
	}, [defaultCurrentPage]);

	useEffect(() => {
		if (currentButton === DOTS) return;
		setCurrentPage(+currentButton);
	}, [currentButton, setCurrentPage]);

	const handlePrevious = () => {
		setCurrentButton((prev) =>
			prev === FIRST_PAGE ? prev : +prev - INDEX_ONE,
		);
	};

	const handleNext = () => {
		setCurrentButton((prev) =>
			prev === numberOfPages.length ? prev : +prev + INDEX_ONE,
		);
	};

	return (
		<nav
			aria-label="pagination navigation"
			className={styles["pagination-container"]}
		>
			<IconButton
				aria-label="Previous page"
				className={clsx(styles["pagination__arrow_button"], {
					[styles["disabled"]]: currentButton === FIRST_PAGE,
				})}
				isDisabled={currentButton === FIRST_PAGE}
				onClick={handlePrevious}
			>
				<Icon
					className={styles["pagination__arrow"]}
					name={IconName.ARROW_LEFT_LONG}
				/>
			</IconButton>

			{displayedPages.map((item, index) => (
				<Button
					aria-label={`Page ${item}`}
					className={clsx(
						typeof item === "number" && styles["pagination__button_number"],
						styles["pagination__button"],
						{ [styles["active"]]: currentButton === item },
					)}
					key={index}
					onClick={() => typeof item === "number" && setCurrentButton(item)}
					variant={ButtonVariant.DEFAULT}
				>
					{item}
				</Button>
			))}
			<IconButton
				aria-label="Next page"
				className={clsx(styles["pagination__arrow_button"], {
					[styles["disabled"]]: currentButton === numberOfPages.length,
				})}
				isDisabled={currentButton === numberOfPages.length}
				onClick={handleNext}
			>
				<Icon
					className={styles["pagination__arrow"]}
					name={IconName.ARROW_RIGHT_LONG}
				/>
			</IconButton>
		</nav>
	);
};

export { Pagination };
