import App from '@src/app';
import { createRoot } from 'react-dom/client';

const rootElement =
  document.getElementById('root') ??
  ((): HTMLElement => {
    throw new window.Error('Root element is not found.');
  })();
const root = createRoot(rootElement);
root.render(<App />);
