import './App.css';
import { useReducer, useRef, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import Edit from './pages/Edit';
import New from './pages/New';
import Notfound from './pages/Notfound';

const mockData = [
  {
    id: 1,
    createdDate: new Date().getTime(),
    emotionId: 1,
    content: '1번 일기 내용',
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emotionId: 2,
    content: '2번 일기 내용',
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      // action.data 새로운 item 추가, ...state 원본 데이터 복사
      return [action.data, ...state];
    case 'UPDATE':
      return state.map(item => (String(item.id) === String(action.data.id) ? action.data : item));
    case 'DELETE':
      // item.id와 action.id가 같은 객체는 제거되고 나머지 반환
      return state.filter(item => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

const DiaryStateContext = createContext();
const DiaryDispatchContext = createContext();

function App() {
  // [data, dispatch] state와 같은 기능
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3); // 앞으로 생성될 일기 item의 id를 저장

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        // 새로운 일기가 생성될 때마다 idRef 값 증가
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 삭제
  const onDelete = id => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  return (
    <>
      {/* 모든 컴포넌트에서 data state 값을 공급 가능 */}
      <DiaryStateContext.Provider value={data}>
        {/* 모든 컴포넌트에서 onCreate, onUpdate, onDelete 상태변화 함수 공급 가능 */}
        <DiaryDispatchContext.Provider value={(onCreate, onUpdate, onDelete)}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
