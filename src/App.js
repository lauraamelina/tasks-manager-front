import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import PageLogin from './pages/auth/PageLogin';
import NavBar from './components/navbar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<PageLogin />} />
      </Routes>
    </>
  );
}

export default App;
