import Players from "./components/players/Players";
import GameBoard from "./components/players/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

function currSelectedPlayer(gameLogs) {
  let currPlayer = "X";
  if (gameLogs.length > 0 && gameLogs[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getGameBoard(gameLogs) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];

  for (const log of gameLogs) {
    const { square, player } = log;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function getWinner(gameBoard, players) {
  let winner;
  for (const rule of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[rule[0].row][rule[0].column];
    const secondSquareSymbol = gameBoard[rule[1].row][rule[1].column];
    const thirdSquareSymbol = gameBoard[rule[2].row][rule[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function getDraw(gameLogs) {
  let isDraw;
  if (gameLogs.length === 9 && winner === undefined) {
    isDraw = true;
  }
  return isDraw;
}

function App() {
  const [gameLogs, setGameLogs] = useState([]);
  const currPlayer = currSelectedPlayer(gameLogs);
  const [players, setPlayers] = useState(PLAYERS);

  const gameBoard = getGameBoard(gameLogs);
  let winner = getWinner(gameBoard, players);
  let isDraw = getDraw(gameLogs);

  function handleSquareClick(rowIndex, colIndex) {
    setGameLogs((prevLogs) => {
      let currentPlayer = "X";
      if (gameLogs.length > 0 && gameLogs[0].player === "X") {
        currentPlayer = "O";
      }
      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevLogs,
      ];
    });
  }

  function handleRematch() {
    setGameLogs([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers({
      ...players,
      [symbol]: newName,
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            initialName={PLAYERS.X}
            symbol="X"
            isActive={currPlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Players
            initialName={PLAYERS.O}
            symbol="O"
            isActive={currPlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver
            winner={winner}
            isDraw={isDraw}
            handleRematch={handleRematch}
          />
        )}
        <GameBoard handleSquareClick={handleSquareClick} board={gameBoard} />
      </div>
      <Log logs={gameLogs} />
    </main>
  );
}

export default App;
