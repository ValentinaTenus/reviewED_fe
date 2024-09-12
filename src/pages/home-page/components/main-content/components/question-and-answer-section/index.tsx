import { useEffect, useState } from 'react';

import { questionsAndAnswers } from '~/common/constants/mock-question-and-answers';

import { QuestionAndAnswerItem } from './components/question-and-answer-item/index';
import styles from './styles.module.scss';

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

  useEffect(() => {
    if (screenWidth < 1280) {
      setQuestionsAnswers(questionsAndAnswers.slice(0,6));
    } else {
      setQuestionsAnswers(questionsAndAnswers.slice(0,8));
    }
  }, [screenWidth]);

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
    </div>
  );
};

export { QuestionAndAnswer };
