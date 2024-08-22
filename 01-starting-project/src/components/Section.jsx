export default function Section({ title, children, ...props }) {
  // ...props 스프레드 문법으로 가져오면 title="Examples" id="examples" 등 모든 요소들을 가져올 수 있다
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
