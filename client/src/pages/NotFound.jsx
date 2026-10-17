import { TitleCase, Emphasis } from '../components/CopyStyle.jsx';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <div className="notfound">
      <Seo title="Page not found" noindex />
      <h1><TitleCase>404</TitleCase></h1>
      <p><Emphasis>We couldn't find that page. It may have moved or the link may be wrong.</Emphasis></p>
      <Link to="/" className="btn btn-c">Back to home</Link>
    </div>
  );
}
