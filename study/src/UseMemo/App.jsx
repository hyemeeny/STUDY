import { useEffect, useMemo, useState } from 'react';

// useMemo는 동일한 값을 리턴해야하는 함수를 반복적으로 실행해야할 때 메모리에 저장해서 필요할 때마다 재사용하는 hook이다
// 메모리를 소비해서 저장하는 것이라 꼭 필요할 때만 써야한다(남용 X)

const hardCalculate = number => {
  console.log('어려운 계산');
  for (let i = 0; i < 999999999; i++) {} // 생각하는 시간
  return number + 10000;
};

const easyCalculate = number => {
  console.log('짱 쉬운 계산');
  return number + 1;
};

function App() {
  const [hardNumber, setHardNumber] = useState(1);
  const [easyNumber, setEasyNumber] = useState(1);
  const [todayNumber, setTodayNumber] = useState(0);
  const [isKorea, setIsKorea] = useState(true);

  // 함수형 컴포넌트는 호출(렌더링)이 되면 함수 내부에 있는 변수는 초기화가 된다
  // hardCalculate 함수가 반복적으로 불려서 hardSum에 반복적으로 할당(초기화)
  // useMemo를 사용하면 어떠한 조건이 만족됐을 때만 변수들이 초기화(변수에 할당)가 되게 가능하다
  // 조건을 만족하지 않았다면 렌더링이 되더라도 초기화(변수에 할당)를 하지 않고 이전 갖고있던 메모리를 재사용한다

  // const hardSum = hardCalculate(hardNumber);
  const hardSum = useMemo(() => {
    return hardCalculate(hardNumber);
  }, [hardNumber]); // [] 의존성 배열(deps)에 값을 넣어주면 값이 바뀔때마다 콜백 안에 있는 hardCalculate를 다시 호출해서 hardSum에 할당해준다

  // const easySum = easyCalculate(easyNumber);
  const easySum = useMemo(() => {
    return easyCalculate(easyNumber);
  }, [easyNumber]);

  const location = useMemo(() => {
    return {
      country: isKorea ? '한국' : '외국',
    };
  }, [isKorea]);

  // 객체 타입은 다른 주소에 저장되어서 같은 값이어도 false로 나온다
  // 객체 타입에서 렌더링 할때마다 location 객체를 다시 할당 받아서 다른 주소가 된다
  // 이전의 location랑은 다른 메모리 상 공간에 저장이 된다
  useEffect(() => {
    console.log('useEffect 호출');
    // 뭔가 오래걸리는 작업...
  }, [location]);

  return (
    <div>
      <h3>어려운 계산기</h3>
      <input type="number" value={hardNumber} onChange={e => setHardNumber(parseInt(e.target.value))} />
      <span>+ 10000 = {hardSum}</span>

      <h3>쉬운 계산기</h3>
      <input type="number" value={easyNumber} onChange={e => setEasyNumber(parseInt(e.target.value))} />
      <span>+ 1 = {easySum}</span>

      <hr />

      <h2>하루에 몇끼 먹어요?</h2>
      <input type="number" value={todayNumber} onChange={e => setTodayNumber(e.target.value)} />

      <hr />

      <h2>어느 나라에 있어요?</h2>
      <p>나라: {location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
    </div>
  );
}

export default App;
