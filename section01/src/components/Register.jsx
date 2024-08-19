import { useState, useRef } from 'react';

// 간단한 회원가입 폼
const Register = () => {
  // const [name, setName] = useState("이름");
  // const [birth, setBirth] = useState("");
  // const [country, setcountry] = useState('');
  // const [bio, setBio] = useState('');

  // 상태 변화 함수: 위의 state를 객체로 하나로 합침
  const [input, setInput] = useState({
    name: '',
    birth: '',
    country: '',
    bio: '',
  });

  // 레퍼런스 객체 생성: 리렌더링 하지 않는다
  const countRef = useRef(0);
  const inputRef = useRef();

  // 통합 이벤트 핸들러: 아래 이벤트 핸들러를 하나로 묶어줌
  const onChange = e => {
    countRef.current++;
    console.log(countRef.current);
    // console.log(e.target.name, e.target.value);
    setInput({
      ...input,
      // [e.target.name] 변수 값이 프로퍼티 키로 설정
      [e.target.name]: e.target.value,
    });
  };

  // const onChangeName = e => {
  //   setInput({
  //     ...input, // 스프레드 연산자로 기존의 input state에 들어있던 프로퍼티 값들을 변경하지 않고 그대로 유지 (birth, country, bio 등)
  //     name: e.target.value, // 변경할 값만 작성
  //   });
  // };

  // const onChangeBirth = e => {
  //   setInput({
  //     ...input,
  //     // birth 프로퍼티만 변경
  //     birth: e.target.value,
  //   });
  // };

  // const onChangeCountry = e => {
  //   setInput({
  //     ...input,
  //     // country 프로퍼티만 변경
  //     country: e.target.value,
  //   });
  // };

  // const onChangeBio = e => {
  //   setInput({
  //     ...input,
  //     // bio 프로퍼티만 변경
  //     bio: e.target.value,
  //   });
  // };

  const onSubmit = () => {
    if (input.name === '') {
      // 이름을 입력하는 DOM 요소 포커스
      // console.log(inputRef.current); // input 태그 DOM 요소 출력
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <div>
        <input ref={inputRef} name="name" value={input.name} onChange={onChange} placeholder={'이름'} />
      </div>
      <div>
        <input name="birth" value={input.birth} onChange={onChange} type="date" />
      </div>
      <div>
        <select name="country" value={input.country} onChange={onChange}>
          <option value=""></option>
          <option value="kr">한국</option>
          <option value="us">미국</option>
          <option value="uk">영국</option>
        </select>
        <div>
          <textarea name="bio" value={input.bio} onChange={onChange} />
        </div>
      </div>

      <button onClick={onSubmit}>제출</button>
    </div>
  );
};

export default Register;
