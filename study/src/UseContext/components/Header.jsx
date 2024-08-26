import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';

// useContext는 props을 중간 컴포넌트에 전달해 줄 필요 없이 하위 컴포넌트가 사용 가능하게 해주는 hook이다
// page 컴포넌트에 props으로 isDark와 setIsDark를 전달해주지 않아도 Header, Context, Footer 컴포넌트에서 props 처럼 데이터 사용이 가능하다
// props 처럼 useContext를 전달하고 받으려면 {}로 감싸준다 = { isDark }

const Header = () => {
  // props이 아닌 useContext로 isDark를 받아온다
  const { isDark } = useContext(ThemeContext);
  const user = useContext(UserContext);

  return (
    <header
      className="header"
      style={{
        // isDark가 true면 black, false면 lightgray
        backgroundColor: isDark ? 'black' : 'lightgray',
        color: isDark ? 'white' : 'black',
      }}
    >
      <h1>Welcome {user}!</h1>
    </header>
  );
};

export default Header;
