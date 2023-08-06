import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { JournalApp } from './JournalApp.jsx';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <JournalApp />
    </Provider>
  </React.StrictMode>,
);

