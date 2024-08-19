import './List.css';
import TodoItem from './TodoItem';
import { useState, useMemo, useContext } from 'react';
import { TodoStateContext } from '../App';

const List = () => {
  // todos는 객체 구조분해 할당이 아닌 value로 그냥 보내주기 때문에
  // { }를 감싸지 않고 받아온다. (todos는 객체가 아닌 배열 형태)
  const todos = useContext(TodoStateContext);
  const [search, setSearch] = useState('');

  const onChangeSearch = e => {
    setSearch(e.target.value);
  };

  // 검색 기능
  const getFilteredData = () => {
    if (search === '') {
      return todos;
    }
    // includes 메소드로 search 값이 존재하면 true 해당 데이터만 필터링해서 반환
    return todos.filter(todo => todo.content.toLowerCase().includes(search.toLowerCase()));
  };

  const filteredTodos = getFilteredData();

  // 첫번째 인수가 반환하는 값을 그대로 반환(최초로 렌더링 되었을 때 한번한 값이 수행)
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log('getAnalyzedData 호출!');
    const totalCount = todos.length;
    const doneCount = todos.filter(todo => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]); // 의존성 배열 : deps

  return (
    <div className="List">
      <h4>Todo List</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>notDone: {notDoneCount}</div>
      </div>
      <input value={search} onChange={onChangeSearch} placeholder="검색어를 입력하세요" />
      <div className="todos_wapper">
        {filteredTodos.map(todo => {
          // TodoItem에도 전달해야하니 onUpdate, onDelete 프롭 전달
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};

export default List;
