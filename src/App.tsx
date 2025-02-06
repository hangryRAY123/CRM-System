import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthLayout } from './layout/AuthLayout';
import { MainLayout } from './layout/MainLayout';
import { RegForm } from './components/Form/RegForm';
import { AuthForm } from './components/Form/AuthForm';
import { Profile } from './pages/Profile';
import { UserProfile } from './pages/UserProfile';
import { Users } from './pages/Users';
import { TodoList } from './pages/TodoList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/' element={<AuthLayout />}>
          <Route path='login' element={<AuthForm />} />
          <Route path='register' element={<RegForm />} />
        </Route>
        <Route path='/' element={<MainLayout />}>
          <Route path='profile' element={<Profile />} />
          <Route path='profile/:id' element={<UserProfile />} />
          <Route path='users' element={<Users />} />
          <Route path='todolist' element={<TodoList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
