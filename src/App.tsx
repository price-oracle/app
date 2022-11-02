import { Route, Routes } from 'react-router-dom';
import './assets/fonts/price-icons/style.css';

import '~/App.css';
import Home from '~/pages/Home';
import LandingPage from './pages/Landing/LandingPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}

export default App;
