import React from 'react';

// testing
import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

// all providers needed
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import store from '~/store';

const { chains, provider } = configureChains([chain.mainnet, chain.localhost], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: 'Price Oracle',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const AllTheProviders = ({ children }: { children: React.ReactElement }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    </WagmiConfig>
  );
};

const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: AllTheProviders,
    ...options,
  });

afterEach(() => {
  cleanup();
});

export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
