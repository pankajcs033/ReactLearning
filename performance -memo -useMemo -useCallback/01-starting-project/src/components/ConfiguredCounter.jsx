import { useState } from "react";

export default function ConfiguredCounter({ setCount }) {
  const [enteredNumber, setEnteredNumber] = useState(0);
  function handleChange(event) {
    setEnteredNumber(+event.target.value);
  }

  function handleSetClick() {
    setCount(enteredNumber);
    setEnteredNumber(0);
  }

  return (
    <section id="configure-counter">
      <h2>Set Counter</h2>
      <input type="number" onChange={handleChange} value={enteredNumber} />
      <button onClick={handleSetClick}>Set</button>
    </section>
  );
}
