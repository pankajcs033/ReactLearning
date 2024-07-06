export default function Log({ logs }) {
  return (
    <ol id="log">
      {logs.map((log, logIndex) => (
        <li key={`${log.square.row}${log.square.col}`}>
          {log.player} selected {log.square.row} {log.square.col}
        </li>
      ))}
    </ol>
  );
}
