import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, teamsDarkTheme } from '@fluentui/react-components';
import './main.css';


import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <FluentProvider theme={teamsDarkTheme}>
    <App />
  </FluentProvider>
);