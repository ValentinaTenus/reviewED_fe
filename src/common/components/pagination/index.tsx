import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

import { ButtonVariant, IconName } from "~/common/enums/index";

import { Button, Icon, IconButton } from "../index";
import styles from "./styles.module.scss";

type PaginationProperties = {
	pages?: number;
	setCurrentPage: (page: number) => void;
};

const DOTS_INITIAL = "...";
const DOTS_LEFT = "... ";
const DOTS_RIGHT = " ...";

const INDEX_ZERO = 0;
const INDEX_ONE = 1;
const INDEX_TWO = 2;
const VISIBLE_PAGES = 5;
const INITIAL_THRESHOLD = 3;
const END_THRESHOLD = 3;
const DEFAULT_PAGE_NUMBER = 10;

const Pagination: React.FC<PaginationProperties> = ({
	pages = DEFAULT_PAGE_NUMBER,
	setCurrentPage,
}) => {
	const [currentButton, setCurrentButton] = useState<number | string>(
		INDEX_ONE,
	);
	const [arrOfCurrButtons, setArrOfCurrButtons] = useState<(number | string)[]>(
		[],
	);

	const numberOfPages = useMemo(() => {
		return Array.from({ length: pages }, (_, i) => i + INDEX_ONE);
	}, [pages]);

	useEffect(() => {
		let tempNumberOfPages: (number | string)[] = [...arrOfCurrButtons];

		if (numberOfPages.length < VISIBLE_PAGES) {
			tempNumberOfPages = numberOfPages;
		} else if (
			+currentButton >= INDEX_ONE &&
			+currentButton <= INITIAL_THRESHOLD
		) {
			tempNumberOfPages = [
				...numberOfPages.slice(INDEX_ZERO, INITIAL_THRESHOLD + INDEX_ONE),
				DOTS_INITIAL,
				numberOfPages.length,
			];
		} else if (currentButton === INITIAL_THRESHOLD + INDEX_ONE) {
			tempNumberOfPages = [
				...numberOfPages.slice(INDEX_ZERO, INITIAL_THRESHOLD + INDEX_TWO),
				DOTS_INITIAL,
				numberOfPages.length,
			];
		} else if (
			+currentButton > INITIAL_THRESHOLD + INDEX_ONE &&
			+currentButton < numberOfPages.length - INDEX_TWO
		) {
			const sliced1 = numberOfPages.slice(
				+currentButton - INDEX_TWO,
				+currentButton,
			);
			const sliced2 = numberOfPages.slice(
				+currentButton,
				+currentButton + INDEX_ONE,
			);

			tempNumberOfPages = [
				INDEX_ONE,
				DOTS_LEFT,
				...sliced1,
				...sliced2,
				DOTS_RIGHT,
				numberOfPages.length,
			];
		} else if (+currentButton > numberOfPages.length - END_THRESHOLD) {
			const sliced = numberOfPages.slice(
				numberOfPages.length - (END_THRESHOLD + INDEX_ONE),
			);

			tempNumberOfPages = [INDEX_ONE, DOTS_LEFT, ...sliced];
		} else if (currentButton === DOTS_INITIAL) {
			setCurrentButton(
				(arrOfCurrButtons[arrOfCurrButtons.length - END_THRESHOLD] as number) +
					INDEX_ONE,
			);
		} else if (currentButton === DOTS_RIGHT) {
			setCurrentButton((arrOfCurrButtons[END_THRESHOLD] as number) + INDEX_TWO);
		} else if (currentButton === DOTS_LEFT) {
			setCurrentButton((arrOfCurrButtons[END_THRESHOLD] as number) - INDEX_TWO);
		}

		setArrOfCurrButtons(tempNumberOfPages);
		setCurrentPage(+currentButton);
	}, [currentButton, numberOfPages, arrOfCurrButtons, setCurrentPage]);

	return (
		<nav
			aria-label="pagination navigation"
			className={styles["pagination-container"]}
		>
			<IconButton
				aria-label="Previous page"
				className={clsx(
					styles["pagination__arrow"],
					styles[`${currentButton === INDEX_ONE ? "disabled" : ""}`],
				)}
				isDisabled={currentButton === INDEX_ONE}
				onClick={() =>
					setCurrentButton((prev) =>
						+prev <= INDEX_ONE ? prev : +prev - INDEX_ONE,
					)
				}
			>
				<Icon name={IconName.ARROW_LEFT_LONG} />
			</IconButton>

			{arrOfCurrButtons.map((item, index) => (
				<Button
					aria-label={`Page ${item}`}
					className={clsx(
						typeof item === "number" && styles["pagination__button_number"],
						styles["pagination__button"],
						styles[`${currentButton === item ? "active" : ""}`],
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
				className={clsx(
					styles["pagination__arrow"],
					styles[`${currentButton === numberOfPages.length ? "disabled" : ""}`],
				)}
				isDisabled={currentButton === numberOfPages.length}
				onClick={() =>
					setCurrentButton((prev) =>
						+prev >= numberOfPages.length ? prev : +prev + INDEX_ONE,
					)
				}
			>
				<Icon name={IconName.ARROW_RIGHT_LONG} />
			</IconButton>
		</nav>
	);
};

export { Pagination };
