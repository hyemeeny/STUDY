import { useState } from 'react';

export default function TodoItem({ todo, onUpdate, onDelete }) {
  const [edit, setEdit] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.title);

  const onClickDelete = () => {
    onDelete(todo.id);
  };

  const onClickUpdate = () => {
    onUpdate(todo.id, newTodo);
    setEdit(false);
  };

  const onChangeInput = e => {
    setNewTodo(e.target.value);
  };

  const onClickEdit = () => {
    setEdit(prev => !prev);
  };

  return (
    <li>
      {edit ? (
        <>
          <input type="text" value={newTodo} onChange={onChangeInput} />
          <button onClick={onClickUpdate}>확인</button>
          <button onClick={onClickEdit}>취소</button>
        </>
      ) : (
        <>
          {todo.title}
          <button type="button" onClick={onClickDelete}>
            삭제
          </button>
          <button type="button" onClick={onClickEdit}>
            수정
          </button>
        </>
      )}
    </li>
  );
}
