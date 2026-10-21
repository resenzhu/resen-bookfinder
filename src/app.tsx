import '@src/app.css';
import { type JSX, StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from '@src/router';

const App = (): JSX.Element => (
  <StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </StrictMode>
);

export default App;
