export function TabButton({ children, onSelect, selectedButton }) {
  return (
    <li>
      <button className={selectedButton ? 'active' : ''} onClick={onSelect}>{children}</button>
    </li>
  );
}
