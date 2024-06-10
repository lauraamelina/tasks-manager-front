import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import PageLogin from './pages/auth/PageLogin';
import PageRegister from './pages/auth/PageRegister';
import NavBar from './components/navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import * as authService from './services/auth/auth.service';
import { useEffect, useState } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const user = authService.getUser();
    if (user) {
      setAuthenticated(true);
    }
  }, []);

  function onLogin(result) {
    authService.setToken(result.token);
    authService.setUser(result.user);
    setAuthenticated(true);
  }

  if (!authenticated) {
    return (
      <>
        <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
        <Routes>
          <Route path='/login' element={<PageLogin onLogin={onLogin} />} />
          <Route path='/registro' element={<PageRegister />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </>
    );
  }
  return (
    <>
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
