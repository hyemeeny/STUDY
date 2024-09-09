import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  // 컴포넌트 함수가 재실행되어도 값이 유실되지 않는다.
  // state와 다른 점은 컴포넌트 함수를 다시 실행하도록 하지 않는다.
  // UI에 영향을 주지 않는 값을 제어하고 싶을 때 참조 사용
  const timer = useRef();
  const dialog = useRef();

  // 간격이 10 밀리초이므로 targetTime * 1000가 초기값
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // 타이머가 자동으로 멈출 때 (졌을 때)
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // dialog 참조에 저장되며 ResultModal 컴포넌트에 open 객체와 연결된다. ResultModal의 open 메소드는 여기서 호출된다.
    dialog.current.open();
  }

  // 타이머가 자동으로 멈출 때 선언하면 매번 초기값으로 변경되므로 함수를 따로 만들어서 재설정해야한다.
  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    // setInterval(간격설정) 시간이 얼마 남았는지 알려준다.
    timer.current = setInterval(() => {
      // 10 밀리초마다 업데이트
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  // 타이머를 수동으로 멈출 때 (이겼을 때)
  function handleStop() {
    dialog.current.open();
    // 변수나 상태가 아닌 참조를 사용해야한다. timer.current
    clearInterval(timer.current);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "타이머 실행 중 ..." : "타이머 비활성화"}
        </p>
      </section>
    </>
  );
}
