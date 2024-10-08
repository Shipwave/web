/* @refresh reload */
import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';
import './index.css';
import Root from './pages/Root';
import Upload from './pages/Upload';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <Router>
      <Route path="/" component={Root} />
      <Route path="/upload" component={Upload} />
    </Router>
  ), root!
);
