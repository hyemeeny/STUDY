import { forwardRef } from "react";

// ...props => NewProject 컴포넌트 Input에서 정의한 모든 속성 prop으로 받음
const Input = forwardRef(({ label, textarea, ...props }, ref) => {
  const classes =
    "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {/* {...props} 모든 문자 영역이나 입력값 가져옴 */}
      {textarea ? (
        <textarea ref={ref} className={classes} {...props} />
      ) : (
        <input ref={ref} className={classes} {...props} />
      )}
    </p>
  );
});

export default Input;
