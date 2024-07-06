import { useState } from "react";

import { EXAMPLES } from "../data";
import { TabButton } from "./TabButton/TabButton";
import Tab from "./TabButton/Tab";

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    console.log(selectedButton);
    setSelectedTopic(selectedButton);
  }

  return (
    <section id="examples">
      <h2>Examples</h2>
      <Tab
        buttons={
          <>
            <TabButton
              selectedButton={selectedTopic === "components"}
              onSelect={() => handleSelect("components")}
            >
              Components
            </TabButton>
            <TabButton
              selectedButton={selectedTopic === "jsx"}
              onSelect={() => handleSelect("jsx")}
            >
              JSX
            </TabButton>
            <TabButton
              selectedButton={selectedTopic === "props"}
              onSelect={() => handleSelect("props")}
            >
              Props
            </TabButton>
            <TabButton
              selectedButton={selectedTopic === "state"}
              onSelect={() => handleSelect("state")}
            >
              State
            </TabButton>
          </>
        }
      ></Tab>
      {!selectedTopic ? (
        <p>Please Select a Topic.</p>
      ) : (
        <div id="tab-content">
          <h2>{EXAMPLES[selectedTopic].title}</h2>
          <p>{EXAMPLES[selectedTopic].description}</p>
          <pre>
            <code>{EXAMPLES[selectedTopic].code}</code>
          </pre>
        </div>
      )}
    </section>
  );
}
