import { useCallback, useEffect, useState } from 'react';

import { questionsAndAnswers } from '~/common/constants/mock-question-and-answers';

import { QuestionAndAnswerItem } from './components/question-and-answer-item/index';
import styles from './styles.module.scss';
import { Button, Icon } from '~/common/components';
import { AppRoute, ButtonVariant, IconName } from '~/common/enums';
import { useNavigate } from 'react-router-dom';

type QuestionAndAnswer = {
  question: string,
  answer: string,
};

type QuestionAndAnswerSectionProperties = {
  screenWidth: number;
};

const QuestionAndAnswer: React.FC<QuestionAndAnswerSectionProperties> = ({
  screenWidth
}) => {
  const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAndAnswer[]>(questionsAndAnswers.slice(0,8));
  const navigate = useNavigate();

  useEffect(() => {
    if (screenWidth < 1280) {
      setQuestionsAnswers(questionsAndAnswers.slice(0,6));
    } else {
      setQuestionsAnswers(questionsAndAnswers.slice(0,8));
    }
  }, [screenWidth]);

  const handleSeeAllClick = useCallback(() => {
    navigate(AppRoute.QUESTION_AND_ANSWERS)
  }, []);

  return (
    <div className={styles['question_and_answer__container']}>
      <h1 className={styles['question_and_answer__title']}>FAQ</h1>
      <div className={styles['question_and_answer__content']}>
        {questionsAnswers.map(((item, index) => (
          <QuestionAndAnswerItem title={item.question} key={index}>
            <p>
             {item.answer}
            </p>
          </QuestionAndAnswerItem>
        )))}
      </div>
      {screenWidth < 768 && (
        <Button
          appendedIcon={<Icon name={IconName.ARROW_RIGHT}/>}
          onClick={handleSeeAllClick}
          variant={ButtonVariant.OUTLINED_MOBILE}
        />
      )}
      {screenWidth > 768 &&  (
        <Button 
          onClick={handleSeeAllClick}
          variant={ButtonVariant.OUTLINED}
          appendedIcon={<Icon name={IconName.ARROW_RIGHT}/>}
        >
          Дивитись всі
        </Button>
      )}
    </div>
  );
};

export { QuestionAndAnswer };
