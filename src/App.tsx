import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authorization } from './pages/Authorization';
import { Registration } from './pages/Registrtion';
import { Main } from './pages/Main';

function App() {
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
