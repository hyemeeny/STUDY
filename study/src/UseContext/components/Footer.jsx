import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  const toggleTheme = () => {
    // isDark가 true면 false로, false면 true로 토글
    setIsDark(!isDark);
  };

  return (
    <footer
      className="footer"
      style={{
        // isDark가 true면 black, false면 lightgray
        backgroundColor: isDark ? 'black' : 'lightgray',
      }}
    >
      <button className="button" onClick={toggleTheme}>
        Dark Mode
      </button>
    </footer>
  );
};

export default Footer;
