import { useState } from "react";

export default function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);
  const isValid = validationFn(enteredValue);

  function handleChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleBlur,
    handleChange,
    hasError: didEdit && !isValid,
  };
}
