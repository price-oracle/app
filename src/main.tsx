import '@rainbow-me/rainbowkit/styles.css';
import './global.css';
import './polyfills';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

// custom rainbowkit theme
import { priceDarkTheme } from './components/shared/theme/rainbowtheme';

import App from './App';

import store from '~/store';
import { getConfig } from './config';
import { getChains } from './utils';

const { chains, provider } = configureChains(getChains(), [
  alchemyProvider({ apiKey: getConfig().ALCHEMY_KEY }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  appName: 'Price Oracle',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={priceDarkTheme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  </React.StrictMode>
);
