import { useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import { getTodoList, postTodoList, patchTodoList } from './api';

export default function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getTodoList().then(data => {
      setTodoList(data);
    });
  }, []);

  const onSubmit = async title => {
    const newTodo = await postTodoList(title);
    setTodoList([...todoList, newTodo]);
  };

  const onDelete = id => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  const onUpdate = async (id, title) => {
    const updateTodo = await patchTodoList(id, title);
    setTodoList(todoList.map(todo => (todo.id === id ? updateTodo : todo)));
  };

  return (
    <div>
      <TodoInput onSubmit={onSubmit} />
      <ul>
        {todoList.map(todo => (
          <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
