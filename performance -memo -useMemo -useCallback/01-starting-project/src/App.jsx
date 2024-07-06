import { useState } from "react";

import Counter from "./components/Counter/Counter.jsx";
import Header from "./components/Header.jsx";
import { log } from "./log.js";
import ConfiguredCounter from "./components/ConfiguredCounter.jsx";

function App() {
  log("<App /> rendered");

  const [chosenCount, setChosenCount] = useState(0);

  function setCount(count) {
    setChosenCount(count);
  }

  return (
    <>
      <Header />
      <main>
        <ConfiguredCounter setCount={setCount} />
        <Counter initialCount={chosenCount} />
      </main>
    </>
  );
}

export default App;
