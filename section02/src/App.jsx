import './App.css';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import Even from './components/Even';
import { useEffect, useState, useRef } from 'react';

// 사이트 이팩트
// 컴포넌트 동작에 따라 파생되는 여러 효과
// useEffect로 사이드 이펙트 관리

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  const isMount = useRef(false);

  // 두번째 인수가 변경하면 사이드 이펙트로
  // 첫번째 인수로 전달한 콜백 함수가 실행

  // 첫번째 인수 (콜백함수), 두번째 인수 (배열)
  // count 스테이트 값이 바뀔때마다 앞에 콜백 함수 실행

  // 1. 마운트 : 탄생(최초로 한번 실행, deps는 빈배열)
  useEffect(() => {
    console.log('mount');
  }, []);

  // 2. 업데이트 : 변화, 리렌더링(deps는 생략)
  useEffect(() => {
    if (!isMount.current) {
      // 진짜 업데이트 단계에서 리렌더링 해야할 때 useRef 사용
      isMount.current = true;
      return;
    }
    console.log('update');
  });

  // 3. 언마운트 : 죽음(화면에서 사라질 때)
  useEffect(() => {});
  // 의존성 배열
  // dependency array
  // deps

  const onClickButton = value => {
    setCount(count + value); // 호출만 함 변경은 안 됨
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input
          value={input}
          onChange={e => {
            setInput(e.target.value);
          }}
        ></input>
      </section>
      <section>
        <Viewer count={count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
