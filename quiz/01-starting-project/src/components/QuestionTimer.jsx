import { useEffect, useState } from "react";

export default function QuestionTimer({ timer, onTimeout, mode }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    console.log("timeout");
    let timeout = setTimeout(onTimeout, timer);

    return () => {
      clearTimeout(timeout);
    };
  }, [timer, onTimeout]);

  useEffect(() => {
    console.log("interval");
    console.log(remainingTime);
    let interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <progress
      className={mode}
      id="question-time"
      value={remainingTime}
      max={timer}
    />
  );
}
