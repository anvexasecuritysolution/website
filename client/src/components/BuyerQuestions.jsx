import { BUYER_QUESTIONS } from '../data/positioning.js';

export default function BuyerQuestions() {
  return (
    <section className="wrap buyer-questions" aria-labelledby="buyer-questions-title">
      <div className="label">Before you enquire</div>
      <h2 id="buyer-questions-title">Questions your team may be asking.</h2>
      <div className="buyer-faq-list">
        {BUYER_QUESTIONS.map((item, index) => (
          <details
            key={item.question}
            onPointerEnter={(event) => {
              if (event.pointerType === 'mouse') event.currentTarget.open = true;
            }}
            onPointerLeave={(event) => {
              if (event.pointerType === 'mouse') event.currentTarget.open = false;
            }}
          >
            <summary><span className="faq-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{item.question}</span></summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
