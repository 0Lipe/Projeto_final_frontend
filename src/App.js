import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'; // Renomeando BrowserRouter para Routes
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import Header from './components/Header';
import PriveteRoute from './utils/PriveteRoute'
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
  <BrowserRouter>
    <AuthProvider>
    <Header/> 
    <Routes>
      <Route element={<PriveteRoute/>}>
        <Route element={<HomePage/>} path='/' exact/>
      </Route>
      <Route element={<LoginPage/>} path='/login'/>
      <Route element={<RegisterPage/>} path='/register'/>
    </Routes>
    </AuthProvider>
  </BrowserRouter>
  );
}

export default App;