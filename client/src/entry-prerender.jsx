import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { PrerenderContext } from './context/PrerenderContext.jsx';
import posts from '../shared/posts.js';

export function render(pathname) {
  const context = {};
  const html = renderToString(
    <HelmetProvider context={context}>
      <StaticRouter location={pathname}>
        <AuthProvider><PrerenderContext.Provider value={posts}><App /></PrerenderContext.Provider></AuthProvider>
      </StaticRouter>
    </HelmetProvider>,
  );
  const { helmet } = context;
  return { html, head: [helmet.title, helmet.meta, helmet.link, helmet.script].map((entry) => entry.toString()).join('\n') };
}
