import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import '~/App.css';
import './assets/fonts/price-icons/style.css';

import AppPage from './pages/AppPage';
import LandingPage from './pages/Landing/LandingPage';
import Pools from './pages/Pools';
import SeedLiquidity from './pages/SeedLiquidity';

import { PropTheme } from './components/shared';
import { Modals } from './containers/modals';
import { Themable } from './containers/Themable';
import { PoolManagerFactoryService, PoolManagerService } from '~/services';
import { useAppDispatch, useAppSelector } from './hooks';
import { PoolManagersActions } from './store/poolManagers/poolManagers.actions';
import { Alerts } from './containers/Alerts';

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
  const dispatch = useAppDispatch();
  // TODO Add a place for them ,in the context or someplace to have them as singleton class
  const poolManagerFactoryService = new PoolManagerFactoryService();
  const poolManagerService = new PoolManagerService();
  const poolManagers = useAppSelector((state) => state.poolManagers.poolManagers);

  useEffect(() => {
    //TODO: This can loop infinitely if the request fails. We need to add a case to the reducer on failure
    if (!poolManagers) {
      dispatch(
        PoolManagersActions.fetchPoolManagers({ factoryService: poolManagerFactoryService, poolManagerService })
      );
    }
  }, [poolManagers]);

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
