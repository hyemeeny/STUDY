import './App.css';
import { useState, useRef, useReducer, useCallback, createContext, useMemo } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';

// 임시로 만든 데이터
const mockData = [
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '빨래하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '노래 연습하기',
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map(item => (item.id === action.targetId ? { ...item, isDone: !item.isDone } : item));
    case 'DELETE':
      return state.filter(item => item.id !== action.targetId);
    default:
      return state;
  }
}

// createContext는 App 컴포넌트 외부에 선언
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

function App() {
  // 데이터를 받아올 때 배열 형태여야 함 mockData=[] 배열 형태
  // const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = useCallback(content => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback(targetId => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  }, []);

  // useCallback으로 인해 mount 되었을 때만 딱 한번 생성,
  // 그 후에는 생성되지 않고 최적화된다
  const onDelete = useCallback(targetId => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    });
  }, []);

  // 리렌더링 될 때 객체가 다시 생성되는 것을 막기위해 useMemo 사용
  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, []);

  return (
    <div className="App">
      <Header />
      {/* Provider 공급자 컴포넌트 */}
      <TodoStateContext.Provider value={todos}> 
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
