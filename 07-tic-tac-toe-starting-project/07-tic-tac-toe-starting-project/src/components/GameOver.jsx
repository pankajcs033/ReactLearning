export default function GameOver({ winner, isDraw, handleRematch }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {winner && <p>{winner} You won!</p>}
      {isDraw && <p>It'a Draw!</p>}
      <button onClick={handleRematch}>Rematch</button>
    </div>
  );
}
