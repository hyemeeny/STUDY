import { useState } from 'react';

// 커스텀 훅: 앞에 use를 붙여준다.
function useInput() {
  const [input, setInput] = useState('');

  const onChange = e => {
    setInput(e.target.value);
  };

  return [input, setInput];
}

export default useInput;
