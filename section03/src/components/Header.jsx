import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <h3>오늘은 📅</h3>
      {/* 오늘 날짜를 렌더링하는 객체  
      => .toDateString()메서드를 사용해야 오류가 안난다. */}
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

export default Header;
