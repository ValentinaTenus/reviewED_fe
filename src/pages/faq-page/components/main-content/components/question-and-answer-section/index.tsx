import { useState } from "react";

import { ToggleGroupButtons } from "~/common/components";
import {
	dropdownData,
	DropdownKey,
	QuestionAndAnswerProperties,
	toggleButtonGroupData,
} from "~/common/constants/faq-page-data";

import { QuestionAndAnswerItem } from "./components/question-and-answer-item/index";
import styles from "./styles.module.scss";

const ZERO_INDEX = 0;

const QuestionAndAnswer = () => {
	const [activeButtonValue, setActiveButtonValue] = useState<DropdownKey>(
		toggleButtonGroupData[ZERO_INDEX],
	);
	const [questionsAnswers, setQuestionsAnswers] = useState<
		QuestionAndAnswerProperties[]
	>(dropdownData[activeButtonValue]);

	const handleButtonClick = (value: string) => {
		setQuestionsAnswers(dropdownData[value as DropdownKey]);
		setActiveButtonValue(value as DropdownKey);
	};

	return (
		<div className={styles["question_and_answer__container"]}>
			<h1 className={styles["question_and_answer__title"]}>FAQ</h1>
			<h4 className={styles["question_and_answer__subtitle"]}>
				Тут Ви можете знайти відповіді на найпоширеніші запитання.
			</h4>
			<ToggleGroupButtons
				activeButtonValue={activeButtonValue}
				buttonGroupItemStyles={styles["question_and_answer__toggle-item"]}
				buttonGroupStyles={styles["question_and_answer__toggle"]}
				handleButtonClick={handleButtonClick}
				toggleButtonGroupData={toggleButtonGroupData}
			/>
			<div className={styles["question_and_answer__content"]}>
				{questionsAnswers.map((item, index) => (
					<QuestionAndAnswerItem key={index} title={item.question}>
						<p>{item.answer}</p>
					</QuestionAndAnswerItem>
				))}
			</div>
		</div>
	);
};

export { QuestionAndAnswer };
