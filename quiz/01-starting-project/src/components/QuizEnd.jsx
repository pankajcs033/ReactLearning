import quizCompleted from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function QuizEnd({ answers }) {
  const correct = answers.filter(
    (answer, index) => QUESTIONS[index].answers[0] === answer
  );
  const skipped = answers.filter((answer) => answer === null);
  const correctAnswerShare = Math.round(
    (correct.length / answers.length) * 100
  );
  const skippedAnswerShare = Math.round(
    (correct.length / answers.length) * 100
  );
  const wrongAnswerShare = 100 - skippedAnswerShare - correctAnswerShare;

  return (
    <div id="summary">
      <img src={quizCompleted} alt="quiz completed logo" />
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswerShare}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswerShare}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswerShare}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <div>
        <ol>
          {answers.map((answer, index) => {
            let cssClass = "user-answer";

            if (answer === QUESTIONS[index].answers[0]) {
              cssClass += " correct";
            } else if (answer !== null) {
              cssClass += " wrong";
            } else {
              cssClass += " skipped";
            }
            return (
              <li key={answer}>
                <h3>{index + 1}</h3>
                <p className="question">{QUESTIONS[index].text}</p>
                <p className={cssClass}>{answer ?? "Skipped"}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
