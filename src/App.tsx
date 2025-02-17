import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthorizationLayout } from './layout/AuthorizationLayout';
import { MainLayout } from './layout/MainLayout';
import { RegistrationForm } from './components/Form/RegistrationForm';
import { AuthorizationForm } from './components/Form/AuthorizationForm';
import { Profile } from './pages/Profile';
import { UserProfile } from './pages/UserProfile';
import { Users } from './pages/Users';
import { TodoList } from './pages/TodoList';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TokenManager from './helpers/token-manager';
import { updateToken } from './api/auth';
import { getProfile } from './api/profile';
import { authAction } from './store/auth/auth-slice';

function App() {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const refreshToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    const updateTokenData = async () => {
      try {
        if (refreshToken) {
          const res = await updateToken(refreshToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          TokenManager.setToken(res.accessToken);

          const profile = await getProfile();
          dispatch(authAction.setIsAuth(true));
          dispatch(authAction.checkRole(profile));
        }
      } catch (error: any) {
        dispatch(authAction.setIsAuth(false));
        navigate('/auth/login');
        throw new Error(error.response.data || 'Failed to refresh token. Please try again later.');
      }
    };

    updateTokenData();
  }, []);

  return (
    <Routes>
      <Route path='/auth/' element={<AuthorizationLayout />}>
        <Route path='login' element={<AuthorizationForm />} />
        <Route path='register' element={<RegistrationForm />} />
      </Route>
      <Route path='/' element={<MainLayout />}>
        <Route path='profile' element={<Profile />} />
        <Route path='profile/:id' element={<UserProfile />} />
        <Route path='users' element={<Users />} />
        <Route path='todolist' element={<TodoList />} />
      </Route>
    </Routes>
  );
}

export default App;
