import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Icon } from "~/common/components/index";
import { ScreenBreakpoints } from "~/common/constants/index";
import { questionsAndAnswers } from "~/common/constants/mock-data/mock-question-and-answers";
import { AppRoute, ButtonVariant, IconName } from "~/common/enums";

import { QuestionAndAnswerItem } from "./components/question-and-answer-item/index";
import styles from "./styles.module.scss";

const ZERO_LENGTH = 0;
const MaxQuestionsNumber = {
	DESKTOP: 8,
	TABLET: 6,
};

type QuestionAndAnswerProperties = {
	answer: string;
	question: string;
};

type QuestionAndAnswerSectionProperties = {
	screenWidth: number;
};

const QuestionAndAnswer: React.FC<QuestionAndAnswerSectionProperties> = ({
	screenWidth,
}) => {
	const [questionsAnswers, setQuestionsAnswers] = useState<
		QuestionAndAnswerProperties[]
	>(questionsAndAnswers.slice(ZERO_LENGTH, MaxQuestionsNumber.DESKTOP));
	const navigate = useNavigate();

	useEffect(() => {
		if (screenWidth < ScreenBreakpoints.DESKTOP) {
			setQuestionsAnswers(
				questionsAndAnswers.slice(ZERO_LENGTH, MaxQuestionsNumber.TABLET),
			);
		} else {
			setQuestionsAnswers(
				questionsAndAnswers.slice(ZERO_LENGTH, MaxQuestionsNumber.DESKTOP),
			);
		}
	}, [screenWidth]);

	const handleSeeAllClick = useCallback(() => {
		navigate(AppRoute.FAQ_PAGE);
	}, [navigate]);

	return (
		<div className={styles["question_and_answer__container"]}>
			<h1 className={styles["question_and_answer__title"]}>FAQ</h1>
			<div className={styles["question_and_answer__content"]}>
				{questionsAnswers.map((item, index) => (
					<QuestionAndAnswerItem key={index} title={item.question}>
						<p>{item.answer}</p>
					</QuestionAndAnswerItem>
				))}
			</div>
			{screenWidth < ScreenBreakpoints.TABLET && (
				<Button
					appendedIcon={<Icon name={IconName.ARROW_RIGHT} />}
					onClick={handleSeeAllClick}
					variant={ButtonVariant.OUTLINED_MOBILE}
				/>
			)}
			{screenWidth > ScreenBreakpoints.TABLET && (
				<Button
					appendedIcon={<Icon name={IconName.ARROW_RIGHT} />}
					onClick={handleSeeAllClick}
					variant={ButtonVariant.OUTLINED}
				>
					Дивитись всі
				</Button>
			)}
		</div>
	);
};

export { QuestionAndAnswer };
