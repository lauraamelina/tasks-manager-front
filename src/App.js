import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import PageAddTask from './pages/task/PageAddTask';
import PageLogin from './pages/auth/PageLogin';
import PageRegister from './pages/auth/PageRegister';
import NavBar from './components/navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import * as authService from './services/auth/auth.service';
import { useEffect, useState } from 'react';
import PageListTask from './pages/task/PageListTask';
import PageTaskById from './pages/task/PageTaskById';
import PageProfile from './pages/profile/PageProfile';
import ErrorBoundary from './utils/ErrorBoundary';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = authService.getUser();
    const tokenExpired = authService.isTokenExpired();

    if (user && !tokenExpired) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
      authService.logout();
      if (!location.pathname.includes('/registro')) {
        toast.error('Tu sesión expiró. Por favor iniciá sesión nuevamente.', {
          position: 'bottom-right',
          autoClose: 5000,
          onClose: () => navigate('/login')
        });
      }
    }
  }, [navigate, location.pathname]);

  function handleLogin(result) {
    authService.setToken(result.token);
    authService.setUser(result.user);
    setAuthenticated(true);
    navigate('/');
  }

  if (!authenticated) {
    return (
      <ErrorBoundary>
        <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <Routes>
          <Route path='/login' element={<PageLogin onLogin={handleLogin} />} />
          <Route path='/registro' element={<PageRegister onRegister={handleLogin} />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/add' element={<PageAddTask />} />
        <Route path='/list' element={<PageListTask />} />
        <Route path='/list/:id' element={<PageTaskById />} />
        <Route path='/perfil' element={<PageProfile />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
