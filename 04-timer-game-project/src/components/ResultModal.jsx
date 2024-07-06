import { forwardRef, useImperativeHandle } from "react";
import { useRef } from "react";

const ResultRef = forwardRef(function ResultModel(
  { targetTime, timeRemaining, handleReset },
  ref
) {
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
  const formattedTime = (timeRemaining / 1000).toFixed(2);
  const dialogRef = useRef();
  const lost = timeRemaining <= 0;
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialogRef} className="result-modal" onClose={handleReset}>
      {lost && <h2>"You Lost" </h2>}
      {!lost && <h2>"Your Score {score}" </h2>}
      <p>
        Your timer is of <strong>{targetTime}s</strong>
      </p>
      <p>
        you stoped the time before{" "}
        <strong>
          {formattedTime}
          {formattedTime == 1 ? "" : "s"}
        </strong>
      </p>
      <form method="dialog" onSubmit={handleReset}>
        <button>close</button>
      </form>
    </dialog>
  );
});
export default ResultRef;
