import Button from './Button';
import './Editor.css';
import EmotionItem from './EmotionItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emotionList = [
  {
    emotionId: 1,
    emotionName: '완전 좋음',
  },
  {
    emotionId: 2,
    emotionName: '좋음',
  },
  {
    emotionId: 3,
    emotionName: '그럭저럭',
  },
  {
    emotionId: 4,
    emotionName: '나쁨',
  },
  {
    emotionId: 5,
    emotionName: '끔찍함',
  },
];

// value는 숫자를 읽을 수 없어 문자열로 변환해야한다
// Date 객체의 값을 문자열로 변환하는 함수
const getStringedDate = targetDate => {
  // 날짜 -> YYYY-MM-DD
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = ({ onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });

  const nav = useNavigate();

  const onChangeInput = e => {
    let name = e.target.name;
    let value = e.target.value;

    // 문자열을 Date 객체로 변환
    if (name === 'createdDate') {
      value = new Date(value);
    }

    setInput({
      ...input,
      // [수정할 프로퍼티의 키값]: 수정할 값
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input name="createdDate" onChange={onChangeInput} value={getStringedDate(input.createdDate)} type="date" />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        <div className="emotion_list_wrapper">
          {emotionList.map(item => (
            // 컴포넌트이기 때문에 이벤트 객체가 자동으로 전달 X
            // 별도로 이벤트 객체를 만들어줘야 한다
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: 'emotionId',
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea name="content" value={input.content} onChange={onChangeInput} placeholder="오늘은 어땠나요?" />
      </section>
      <section className="button_section">
        <Button onClick={() => nav(-1)} text={'취소하기'} />
        <Button onClick={onClickSubmitButton} text={'작성완료'} type={'POSITIVE'} />
      </section>
    </div>
  );
};

export default Editor;
