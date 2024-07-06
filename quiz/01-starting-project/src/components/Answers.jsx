import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  currAnswerState,
  handleSelectAnswer,
}) {
  let shuffledAnswers = useRef();
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        let cssClass = "";
        let isSelected = answer === selectedAnswer;
        if (currAnswerState === "answered" && isSelected) {
          cssClass = "selected";
        }
        if (
          isSelected &&
          (currAnswerState === "correct" || currAnswerState === "wrong")
        ) {
          cssClass = currAnswerState;
        }
        return (
          <li key={answer} className="answer">
            <button
              onClick={() => handleSelectAnswer(answer)}
              className={cssClass}
              disabled={currAnswerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
