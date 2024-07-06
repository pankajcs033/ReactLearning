import { useState } from "react";

import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions.js";

export default function Question({
  questionIndex,
  timer,
  handleSkipAnswer,
  handleSelectAnswer,
}) {
  const [answers, setAnswers] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  if (answers.selectedAnswer !== "") {
    timer = 1000;
  }
  if (answers.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectedAnswer(answer) {
    setAnswers({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswers({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[questionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        handleSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let currentAnswerState = "";
  if (answers.selectedAnswer && answers.isCorrect !== null) {
    currentAnswerState = answers.isCorrect ? "correct" : "wrong";
  } else if (answers.selectedAnswer) {
    currentAnswerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timer={timer}
        onTimeout={answers.selectedAnswer === "" ? handleSkipAnswer : null}
        mode={currentAnswerState}
      />

      <h2>{QUESTIONS[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS[questionIndex].answers}
        selectedAnswer={answers.selectedAnswer}
        currAnswerState={currentAnswerState}
        handleSelectAnswer={handleSelectedAnswer}
      />
    </div>
  );
}
