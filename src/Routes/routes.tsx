// src/Routes/routes.tsx
import { Routes, Route } from 'react-router';
import Menu from '../pages/Menu';
import Login from '../pages/LoginPage';
import Register from '../pages/RegisterPage';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="menu" element={<ProtectedRoute><Menu/></ProtectedRoute>} />
      <Route path="register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
