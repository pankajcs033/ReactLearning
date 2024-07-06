import { useState } from "react";
import InvestmentInput from "./components/InvestmentInput";
import Results from "./components/Results";

const INPUTS_LABELS_VALUES = {
  initialInvestment: 1000,
  annualInvestment: 110,
  expectedReturn: 10,
  duration: 10,
};

function App() {
  const [inputValues, setInputValues] = useState({ ...INPUTS_LABELS_VALUES });
  let invalidValue = inputValues.duration <= 0;
  function handleValueChange(label, value) {
    setInputValues({
      ...inputValues,
      [label]: +value,
    });
  }

  return (
    <>
      <InvestmentInput
        inputValues={inputValues}
        handleValueChange={handleValueChange}
      />
      {invalidValue && (
        <p className="center">Please enter a duration greater than 0.</p>
      )}
      {!invalidValue && <Results inputValues={inputValues} />}
    </>
  );
}

export default App;
