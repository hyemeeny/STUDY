import './App.css';
import { useState, useRef, useReducer, act } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import List from './components/List';
// import Exam from './components/Exam';

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

function App() {
  // 데이터를 받아올 때 배열 형태여야 함 mockData=[] 배열 형태
  // const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = content => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  // useState 생성하기
  // const onCreate = content => {
  //   const newTodo = {
  //     id: idRef.current++,
  //     isDone: false,
  //     // 매개변수로 받아온 content
  //     content: content,
  //     date: new Date().getTime(),
  //   };

  //   // 배열 형태로 기존의 todos 값을 넣어준다
  //   // newTodo 추가하고자 하는 데이터
  //   setTodos([newTodo, ...todos]);
  // };

  const onUpdate = targetId => {
    dispatch({
      type: 'UPDATE',
      targetId: targetId,
    });
  };

  // useState 수정하기
  // const onUpdate = targetId => {
  //   // todos State의 값들 중에
  //   // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경

  //   // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열
  //   setTodos(todos.map(todo => (todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo)));
  // };

  const onDelete = targetId => {
    dispatch({
      type: 'DELETE',
      targetId: targetId,
    });
  };

  // useState 삭제하기
  // const onDelete = targetId => {
  //   // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열(삭제 대상이 아닌 요소들만 필터링)
  //   setTodos(todos.filter(todo => todo.id !== targetId));
  // };

  return (
    <div className="App">
      {/* <Exam /> */}
      <Header />
      <Editor onCreate={onCreate} />
      {/* onUpdate, onDelete 프롭을 List > TodoItem > checkbox로 전달 */}
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
