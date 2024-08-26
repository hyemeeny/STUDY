import { useState, useRef } from 'react';

export default function TodoInput({ onSubmit }) {
  const [title, setTitle] = useState();
  const titleRef = useRef();

  const handleChange = e => {
    setTitle(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (title === '') {
      titleRef.current.focus();
      return;
    }
    onSubmit(title);
    setTitle('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={handleChange} />
        <button type="submit">입력</button>
      </form>
    </>
  );
}
