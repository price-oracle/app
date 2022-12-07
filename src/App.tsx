import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { useAccount, useNetwork } from 'wagmi';

import '~/App.css';
import './assets/fonts/price-icons/style.css';

import AppPage from './pages/AppPage';
import LandingPage from './pages/Landing/LandingPage';
import Pools from './pages/Pools';
import SeedLiquidity from './pages/SeedLiquidity';

import { PropTheme } from './components/shared';
import { Modals } from './containers/modals';
import { Themable } from './containers/Themable';
import { Alerts } from './containers/Alerts';
import { useAppSelector, useUpdateState } from '~/hooks';

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
  const { updateEthPrice, updatePoolState, updateLockState } = useUpdateState();
  const poolManagers = useAppSelector((state) => state.poolManagers.elements);
  const { address } = useAccount();
  const { chain } = useNetwork();

  useEffect(() => {
    updateEthPrice();
    if (!poolManagers) {
      updatePoolState();
    } else {
      updateLockState();
    }
  }, [poolManagers, address, chain]);

  return (
    <Themable>
      <GlobalStyle />
      <Alerts />
      <Modals />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='*' element={<AppPage />}>
          <Route path='app/pools' element={<Pools />} />
          <Route path='app/seed-liquidity' element={<SeedLiquidity />} />
        </Route>
      </Routes>
    </Themable>
  );
}

export default App;
