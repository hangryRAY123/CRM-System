import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authorization } from './pages/Authorization';
import { Registration } from './pages/Registrtion';
import { useSelector, useDispatch } from 'react-redux';
import { updateRefrashToken } from './store/authorization/auth-action';
import { Main } from './components/Main/Main';

function App() {
  const isAuth = useSelector((state: any) => state.auth.isAuth);
  const dispatch: any = useDispatch();
  const token = localStorage.getItem('refreshToken');

  useEffect(() => {
    console.log(isAuth);
    if (token) {
      dispatch(updateRefrashToken(token));
    }
  }, [isAuth]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Authorization />} />
        <Route path='/reg' element={<Registration />} />
        <Route path='/*' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
