// src/main.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css'
import { Provider, teamsTheme } from '@fluentui/react-northstar';


createRoot(document.getElementById('root')!).render(
 
 <Provider theme={teamsTheme}>
    <Router>
      <App/>
    </Router>
 </Provider>
  
);
