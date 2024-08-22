import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";

const getMonthlyData = (pivotDate, data) => {
  // 이번달의 시작 시간
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0,
  ).getTime(); // 해당하는 월의 1일 0시 0분 0초

  // 이번달의 마지막 시간
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59,
  ).getTime(); // getMonth()+1, 0 => 해당하는 달의 이전달의 마지막날로 설정 (3월의 0일 = 2월의 마지막날)

  // 이번달에 해당하는 데이터만 추출
  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime,
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());

  const monthlyData = getMonthlyData(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        // getMonth는 0부터 시작해서 +1을 해줘야한다
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={
          <Button
            onClick={onDecreaseMonth}
            text={"<"}
          />
        }
        rightChild={
          <Button
            onClick={onIncreaseMonth}
            text={">"}
          />
        }
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
