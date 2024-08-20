import Header from '../components/Header';
import Button from '../components/Button';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  // input.createdDate 문자열을 Time 스탬프 형태로 저장
  const onSubmit = input => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);

    // replace 뒤로가기 방지
    nav('/', { replace: true });
  };

  return (
    <div>
      {/* nav(-1)은 페이지를 뒤로 이동 */}
      <Header title={'새 일기 쓰기'} leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로가기'} />} />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
