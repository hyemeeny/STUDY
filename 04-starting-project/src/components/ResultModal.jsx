import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
// useRef 참조는 다른 컴포넌트로 prop 전달을 할 수 없다.
// 참조를 다른 컴포넌트에 전달하여 사용하고 싶다면 forwardRef(참조전달) 함수 사용

// forwardRef를 사용하려면 전달받는 컴포넌트 함수를 감싸야 한다.
// forwardRef로 감쌀 때는 전달받는 컴포넌트 함수의 두번째 인자로 ref를 받아야한다. ({props} , ref) => forwardRef를 ResultModal 컴포넌트 바깥에서 감싸줬기 때문에 두번째 매개변수로 받는다.
const ResultModal = forwardRef(function ResultModal(
  { targetTime, remainingTime, onReset },
  ref
) {
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  // .toFixed(2) 소수점 두 자리수 까지만 표시
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  // 0부터 100 사이 숫자
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  // useImperativeHandle 훅을 사용하여 TimerChallenge ref와 분리
  useImperativeHandle(ref, () => {
    return {
      open() {
        // dialog는 .showModal() 메소드를 가지고 있다.
        // .showModal() 메소드는 호출하면 보이도록 바뀐다.
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedRemainingTime} seconds left.</strong>
      </p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
});

export default ResultModal;
