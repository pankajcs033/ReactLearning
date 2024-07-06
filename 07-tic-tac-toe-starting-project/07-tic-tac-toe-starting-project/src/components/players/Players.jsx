import { useState } from "react";

export default function Players({
  initialName,
  symbol,
  isActive,
  onNameChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  function handleEdit() {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onNameChange(symbol, name);
    }
  }

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      {!isEditing ? (
        <span className="player-name">{name}</span>
      ) : (
        <input required value={name} onChange={handleChange} />
      )}
      <span className="player-symbol">{symbol}</span>
      <button onClick={() => handleEdit()}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
