// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'
import { Provider, teamsTheme } from '@fluentui/react-northstar';


createRoot(document.getElementById('root')!).render(
 
 <Provider theme={teamsTheme}>
  <StrictMode>
    <Router>
      <App/>
    </Router>
  </StrictMode>
 </Provider>
  
);
