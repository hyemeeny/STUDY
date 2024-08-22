import CoreConcept from './CoreConcept';
import { CORE_CONCEPTS } from '../data';

export default function CoreConcepts() {
  return (
    <section id="core-concepts">
      <h2>Time to get started!</h2>
      <ul>
        {/* 스프레드 구문으로 data 객체를 전부 불러옴 */}
        {CORE_CONCEPTS.map(conceptitem => (
          <CoreConcept key={conceptitem.title} {...conceptitem} />
        ))}
      </ul>
    </section>
  );
}
