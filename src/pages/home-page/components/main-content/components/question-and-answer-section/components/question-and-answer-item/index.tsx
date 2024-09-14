import clsx from "clsx";
import React, { useCallback, useState } from "react";

import { Button, Icon } from "~/common/components/index";
import { ButtonVariant, IconName } from "~/common/enums/index";

import styles from "./styles.module.scss";

type Properties = {
	children?: React.ReactNode;
	title: string;
};

const QuestionAndAnswerItem: React.FC<Properties> = ({ children, title }) => {
	const [isSelected, setIsSelected] = useState(false);

	const handleClick = useCallback(() => {
		setIsSelected(!isSelected);
	}, [isSelected]);

	return (
		<div
			className={
				isSelected
					? styles["question_and_answer_item__container_selected"]
					: styles["question_and_answer_item__container"]
			}
		>
			<div className={styles["question_and_answer_item__title_container"]}>
				<Button
					appendedIcon={
						<Icon
							className={clsx(
								styles["question_and_answer_item__icon"],
								isSelected && styles["question_and_answer_item_selected__icon"],
							)}
							name={isSelected ? IconName.MINUS : IconName.PLUS}
						/>
					}
					className={styles["question_and_answer_item__title"]}
					onClick={handleClick}
					variant={ButtonVariant.DEFAULT}
				>
					<span
						className={clsx(
							styles["question_and_answer_item__question_selected"],
							!isSelected && styles["question_and_answer_item__question"],
						)}
					>
						{title}
					</span>
				</Button>
			</div>
			<div
				className={clsx(
					styles["question_and_answer_item__content_container"],
					isSelected && styles["question_and_answer_item__content_expanded"],
					!isSelected &&
						styles["question_and_answer_item__content_container_hidden"],
				)}
			>
				{children}
			</div>
		</div>
	);
};

export { QuestionAndAnswerItem };
