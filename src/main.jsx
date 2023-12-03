import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, teamsDarkTheme } from '@fluentui/react-components';
import './main.css';
import { Provider } from 'react-redux'
import store from './store'


import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <FluentProvider theme={teamsDarkTheme}>
      <App />
    </FluentProvider>
  </Provider>
);