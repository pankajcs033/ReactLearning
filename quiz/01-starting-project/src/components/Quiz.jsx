import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import QuizEnd from "./QuizEnd.jsx";

export default function Quiz() {
  const [answers, setAnswers] = useState("");
  const questionIndex = answers.length;
  const quizEnded = questionIndex === QUESTIONS.length;
  const timer = 10000;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);
  },
  []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizEnded) {
    return <QuizEnd answers={answers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={questionIndex}
        questionIndex={questionIndex}
        timer={timer}
        handleSkipAnswer={handleSkipAnswer}
        handleSelectAnswer={handleSelectAnswer}
      />
    </div>
  );
}
