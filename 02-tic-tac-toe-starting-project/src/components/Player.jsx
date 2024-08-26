import { useState } from "react";

export default function Player({
  initialname,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialname);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((editing) => !editing);

    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };

  const handleChange = (e) => {
    console.log(e);
    setPlayerName(e.target.value);
  };

  // let editalblePlayerName = <span className="player-name">{playerName}</span>;

  // if (isEditing) {
  //   editalblePlayerName = (
  //     <input type="text" required value={playerName} onChange={handleChange} />
  //   );
  // }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        {/* {editalblePlayerName} */}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
