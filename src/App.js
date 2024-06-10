import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import PageLogin from './pages/auth/PageLogin';
import PageRegister from './pages/auth/PageRegister'
import NavBar from './components/navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import * as authService from './services/auth/auth.service';

function App() {
  const user = authService.getUser();

  function onLogin(result) {
    authService.setToken(result.token);
    authService.setUser(result.user);
  }
  if (!user) {
    return (
      <>
        <NavBar />
        <Routes>
          <Route path='/' element={<PageLogin onLogin={onLogin} />} />
          <Route path='/registro' element={<PageRegister />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
