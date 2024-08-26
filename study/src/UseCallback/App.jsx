import { useEffect, useState, useCallback } from 'react';
import Box from './Box';

function App() {
  // 예제 1
  const [number, setNumber] = useState(0);
  const [toggle, setToggle] = useState(true);

  // 예제 2
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  // 예제 1
  const someFunction = useCallback(() => {
    console.log(`someFunc: number: ${number}`);
    return;
  }, [number]); // number가 바뀔때마다 첫번째 인자인 함수가 갱신된다. (someFunction 초기화)

  // 의존성 배열이 빈 배열이면 처음 App 컴포넌트가 렌더링 되었을 때 만들어져서 메모이제이션이 된다.
  // someFunction 안에는 메모이제이션된 함수의 주소가 담긴다.
  // 그 다음 렌더링부터 함수 객체를 새로 생성해서 할당하는게 아닌 이미 가지고 있던 메모이제이션 된 함수 객체의 주소를 재사용한다.

  // 예제 2
  // useCallback로 박스 size가 바뀔때만 함수가 초기화되기 때문에 Box 컴포넌트의 콘솔이 출력된다.
  const createBoxStyle = useCallback(() => {
    return {
      backgroundColor: 'pink',
      width: `${size}px`,
      height: `${size}px`,
    };
  }, [size]);

  useEffect(() => {
    console.log('someFunction이 변경되었습니다.');
  }, [someFunction]);

  return (
    <div>
      {/* 예제 1 */}
      <input type="number" value={number} onChange={e => setNumber(e.target.value)} />
      <button onClick={() => setToggle(!toggle)}>{toggle.toString()}</button>
      <br />
      <button onClick={someFunction}>Call someFunc</button>

      <hr />

      {/* 예제 2 */}
      <div
        style={{
          background: isDark ? 'black' : 'white',
        }}
      >
        <input type="number" value={size} onChange={e => setSize(e.target.value)} />
        <button onClick={() => setIsDark(!isDark)}>Change Theme</button>
        <Box createBoxStyle={createBoxStyle} />
      </div>
    </div>
  );
}

export default App;
