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
import ErrorBoundary from './utils/ErrorBoundary';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getUser();
    if (user && !authService.isTokenExpired()) {
      setAuthenticated(true);
    } else {
      authService.logout();
      toast.error('Your session has expired. Please log in again.', {
        position: 'bottom-right',
        autoClose: 5000,
        onClose: () => navigate('/login')
      });
    }
  }, [navigate]);
  function onLogin(result) {
    authService.setToken(result.token);
    authService.setUser(result.user);
    setAuthenticated(true);
  }

  if (!authenticated) {
    return (
      <ErrorBoundary>
        <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <Routes>
          <Route path='/login' element={<PageLogin onLogin={onLogin} />} />
          <Route path='/registro' element={<PageRegister />} />
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
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
