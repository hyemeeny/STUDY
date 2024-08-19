import "./Main.css";

// JSX 주의 사항
// 1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있다. (if, for X)
// 2. 숫자, 문자열, 배열 값만 렌더링 된다. obj 객체는 렌더링 할 수 없다. -> 점 표기법으로 문자열이나 숫자 값 렌더링
// 3. 모든 태그는 닫혀있어야 한다.
// 4. 최상위 태그는 반드시 하나여야만 한다.

// Main 컴포넌트(자식)
const Main = () => {
  const user = {
    name: "지혜민",
    isLogin: true,
  }
  
  if (user.isLogin) {
    return <div className="logout">로그아웃</div>;
  } else {
    return <div>로그인</div>
  }
  
  // return (
  //   <>
  //     {user.isLogin ? (
  //       <div>로그아웃</div>
  //     ) : (
  //       <div>로그인</div>
  //     )}
  //   </>
  // );
};

export default Main;
