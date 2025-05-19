// src/Routes/routes.tsx
import { Routes, Route } from 'react-router';
import Menu from '../pages/Menu';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ProtectedRoute from './ProtectedRoute';

//This are the routes that will redirect the app to the Exactly locations when we complet a especifically operation
const AppRoutes = ({toggleTheme}: {toggleTheme: (selectedTheme: string) => void }) => {
  return (
    <Routes>
      <Route path="/" element = {<Login />} />
      <Route path="menu" element = {<ProtectedRoute><Menu toggleTheme = {toggleTheme}/></ProtectedRoute>} />
      <Route path="register" element = {<Register />} />
    </Routes>
  );
};

export default AppRoutes;
