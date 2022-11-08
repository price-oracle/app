import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import './assets/fonts/price-icons/style.css';
import '~/App.css';

import AppPage from './pages/AppPage';
import LandingPage from './pages/Landing/LandingPage';
import Pools from './pages/Pools';

import { Themable } from './containers/Themable';
import { PropTheme } from './components/shared';

const GlobalStyle = createGlobalStyle<PropTheme>`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    scroll-behavior: unset;
  }

  html {
    font-size: 62.5%;
  }

  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.background};
  }
`;

function App() {
  return (
    <Themable>
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='*' element={<AppPage />} />
        <Route path='app/pools' element={<Pools />} />
      </Routes>
    </Themable>
  );
}

export default App;
