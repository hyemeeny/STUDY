import './TodoItem.css';

// onUpdate, onDelete 함수 프롭으로 받음
// checkbox input의 값이 변경되었을 때 onUpdate 호출
const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckbox = () => {
    onUpdate(id); // 인수로 id 전달
  };

  const onClickDeleteButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      {/* input에서 변경은 onChange 이벤트 핸들러 사용 */}
      <input readOnly checked={isDone} type="checkbox" onChange={onChangeCheckbox} />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
};

export default TodoItem;
