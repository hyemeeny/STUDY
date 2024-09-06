import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  // 컴포넌트 함수가 재실행되어도 값이 유실되지 않는다.
  // state와 다른 점은 컴포넌트 함수를 다시 실행하도록 하지 않는다.
  // UI에 영향을 주지 않는 값을 제어하고 싶을 때 참조 사용
  const timer = useRef();
  const dialog = useRef();

  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false); // 타이머 만료

  function handleStart() {
    timer.current = setTimeout(() => {
      setTimerExpired(true);
      // dialog는 .showModal() 메소드를 가지고 있다.
      // .showModal() 메소드는 호출하면 보이도록 바뀐다.
      dialog.current.open();
    }, targetTime * 1000);

    setTimerStarted(true);
  }

  function handleStop() {
    clearTimeout(timer.current);
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerStarted ? handleStop : handleStart}>
            {timerStarted ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerStarted ? "active" : undefined}>
          {timerStarted ? "타이머 실행 중 ..." : "타이머 비활성화"}
        </p>
      </section>
    </>
  );
}
