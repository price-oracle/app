import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import './assets/fonts/price-icons/style.css';

import '~/App.css';
import Home from '~/pages/Home';
import LandingPage from './pages/Landing/LandingPage';
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
        <Route path='*' element={<Home />} />
      </Routes>
    </Themable>
  );
}

export default App;
