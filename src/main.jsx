import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './components/App';

import 'bear-react-carousel/dist/index.css';

import ToggleColorMode from './context/ToggleColorMode';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <ToggleColorMode>
      <CssBaseline />

      <App />
    </ToggleColorMode>
  </Provider>,
);
