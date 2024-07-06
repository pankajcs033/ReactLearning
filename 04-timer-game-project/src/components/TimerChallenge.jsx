import { useRef, useState } from "react";
import ResultRef from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const dialog = useRef();
  const timer = useRef();

  const isTimerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining < 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultRef
        ref={dialog}
        targetTime={targetTime}
        timeRemaining={timeRemaining}
        handleReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStop : handleStart}>
            {isTimerActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={isTimerActive ? "active" : undefined}>
          {isTimerActive ? "Time is running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
