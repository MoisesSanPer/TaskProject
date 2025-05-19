
import './App.css'
import AppRoutes from './Routes/routes';
import { UserProvider } from './Context/useAuth.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

const App = ({ toggleTheme }: { toggleTheme: (selectedTheme:string) => void })  => {
  return (
    <UserProvider>
      <AppRoutes toggleTheme={toggleTheme}  />
      <ToastContainer />
    </UserProvider>
  );
};

export default App;
