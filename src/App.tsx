// src/App.tsx
import React from 'react';
import './App.css'
import AppRoutes from './Routes/routes';
import { UserProvider } from './Context/useAuth.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
      <ToastContainer />
    </UserProvider>
  );
};

export default App;
