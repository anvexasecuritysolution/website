import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';

export default function NotFound() {
  return (
    <div className="notfound">
      <Seo title="Page not found" noindex />
      <h1>404</h1>
      <p>That page doesn't exist — but your security gaps might. Let's get you back on track.</p>
      <Link to="/" className="btn btn-c">Back to home</Link>
    </div>
  );
}
