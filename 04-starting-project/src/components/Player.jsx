import { useState, useRef } from "react";

export default function Player() {
  // useRef는 연결된 요소에 접근하여 해당 요소를 참조해준다.
  const playerName = useRef();

  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  // const [submitted, setSubmitted] = useState(false);

  // const handleChange = (e) => {
  //   setSubmitted(false);
  //   setEnteredPlayerName(e.target.value);
  // };

  const handleClick = () => {
    // 자바스크립트 객체 이므로 .current 속성 사용
    // current가 실제 참조값을 가지고 있다. (input 값을 참조)
    setEnteredPlayerName(playerName.current.value);
    playerName.current.value = "";
  };

  return (
    <section id="player">
      <h2>
        {/* enteredPlayerName ? enteredPlayerName === ??*/}
        {/* enteredPlayerName(true) ?? "unknown entity"(false) */}
        Welcome {enteredPlayerName ?? "unknown entity"}
      </h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
