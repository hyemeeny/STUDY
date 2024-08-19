import './Header.css';
import { memo } from 'react';

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

// memo 메서드로 최적화(불필요한 리렌더링 방지)
// const memoizeHeader = memo(Header);

export default memo(Header);
