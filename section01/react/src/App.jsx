import './App.css';
import HookExam from './components/HookExam';

/*
  리렌더링 되는 조건
  1. 자신이 관리하는 state 값 변경 
  2. 자신이 제공받는 props 값 변경 
  3. 부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링
  
  => 중복되는 리렌더링이 안되게하기 위해
  컴포넌트를 분리해준다.
*/

// App 컴포넌트(부모)
function App() {
  return (
    <>
      <HookExam />
    </>
  );
}

export default App;
