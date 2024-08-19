const Button = ({ text, color, children }) => {
  // props 매개변수 대신 직접 작성 가능 -> props.text = text
  // 이벤트 객체
  const onCickButton = e => {
    console.log(e);
    console.log(text);
  };

  return (
    <button
      onClick={onCickButton}
      //onMouseEnter={onCickButton}
      style={{ color: color }}
    >
      {text} - {color.toUpperCase()}
      {children}
    </button>
  );
};

// props 기본값 설정
Button.defaultProps = {
  color: 'black',
};

export default Button;
