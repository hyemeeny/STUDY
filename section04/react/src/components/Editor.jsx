import { useState, useRef } from 'react';
import './Editor.css';

// 구조분해할당으로 onCreate prop 넘겨준다
const Editor = ({ onCreate }) => {
  // input에 입력해주는 값이 content에 보관
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const onChangeContent = e => {
    setContent(e.target.value);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (content === '') {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent('');
  };

  return (
    <div className="Editor">
      <input
        ref={contentRef}
        value={content}
        onKeyDown={onKeyDown}
        onChange={onChangeContent}
        placeholder="새로운 Todo..."
      />
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
