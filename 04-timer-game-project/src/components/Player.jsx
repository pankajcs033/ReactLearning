import { useState } from "react";
import { useRef } from "react";
import TimerChallenge from "./TimerChallenge";

export default function Player() {
  const playerName = useRef();
  const [finalPlayerName, setFinalPlayerName] = useState();

  function handleClick() {
    setFinalPlayerName(playerName.current.value);
    playerName.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome {finalPlayerName ?? "unknown entity"}</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
      <p id="challenges">
        <TimerChallenge title="Easy" targetTime={1} />
        <TimerChallenge title="Not Easy" targetTime={5} />
        <TimerChallenge title="Getting Tough" targetTime={10} />
        <TimerChallenge title="Pros Only" targetTime={15} />
      </p>
    </section>
  );
}
