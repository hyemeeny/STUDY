import { forwardRef, useImperativeHandle, useRef } from "react";
// useRef 참조는 다른 컴포넌트로 prop 전달을 할 수 없다.
// 참조를 다른 컴포넌트에 전달하여 사용하고 싶다면 forwardRef(참조전달) 함수 사용

// forwardRef를 사용하려면 전달받는 컴포넌트 함수를 감싸야 한다.
// forwardRef로 감쌀 때는 전달받는 컴포넌트 함수의 두번째 인자로 ref를 받아야한다. ({props} , ref) => forwardRef를 ResultModal 컴포넌트 바깥에서 감싸줬기 때문에 두번째 매개변수로 받는다.
const ResultModal = forwardRef(function ResultModal(
  { result, targetTime },
  ref
) {
  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return (
    <dialog ref={dialog} className="result-modal">
      <h2>You {result}</h2>
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with <strong>X seconds left.</strong>
      </p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
