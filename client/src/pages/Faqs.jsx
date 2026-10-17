import Seo from '../components/Seo.jsx';
import BuyerQuestions from '../components/BuyerQuestions.jsx';
import { TitleCase } from '../components/CopyStyle.jsx';

export default function Faqs() {
  return (
    <>
      <Seo title="FAQs" />
      <header className="wrap faq-page-intro">
        <div className="label">FAQs</div>
        <h1><TitleCase>Frequently Asked Questions</TitleCase></h1>
        <p>Answers about security testing, access, pricing and what happens after an assessment.</p>
      </header>
      <BuyerQuestions />
    </>
  );
}
