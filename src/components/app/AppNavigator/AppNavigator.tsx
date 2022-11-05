// import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  PriceLogoNavItem,
  SCustomLink,
  Section,
  SHeaderButton,
  SNavigator,
  SNavigatorItemRight,
  StyledLogo,
  ThemeButtonContainer,
} from './AppNavigator.styles';

import { THEME } from '../../shared';
// import {
//   selectWalletConnected,
//   selectWalletStatus,
// } from '../../../../features/wallet/state/wallet.selectors';
// import { useThemeButtonProps } from '../../../../components/atoms/ThemeButton';
// import Modal from '../../../../features/modal/components/molecules/Modal/Modal';
import { useEffect } from 'react';
import { FONT_SIZE_16, SPACING_8, Icon, ConnectButton } from '~/components/shared';

import { Item } from '../Navigator/Navigator.styles';

import { chain, configureChains } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { useWindowDimensions } from '~/hooks/windowDimensions';

const useWallet = () => {
  // const status = useSelector(selectWalletStatus);
  // const connected = useSelector(selectWalletConnected);
  // const queryClient = useQueryClient();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   if (status.starting && !connected) {
  //     queryClient.invalidateQueries(getPoolManagersKey({ connected }));
  //     queryClient.invalidateQueries(getPriceKey());
  //   }
  // }, [connected, status, queryClient]);
  // useEffect(() => {
  //   dispatch(initWallet());
  // }, [dispatch]);
};

const AppNavigator = () => {
  const theme = THEME;
  // const walletConnected = useSelector(selectWalletConnected);
  // const [themeIcon, toggleTheme] = useThemeButtonProps();
  const { isMobile } = useWindowDimensions();

  // useWallet();

  return (
    <Container>
      {isMobile && (
        <PriceLogoNavItem>
          <SCustomLink to='/'>
            <SHeaderButton as={StyledLogo} />
          </SCustomLink>
        </PriceLogoNavItem>
      )}

      <SNavigator>
        <Item>
          <Section>
            {!isMobile && (
              <SCustomLink to='/'>
                <SHeaderButton as={StyledLogo} />
              </SCustomLink>
            )}
            {/* <SCustomLink to="/app" onClick={navProps.handleClickCloseMenu}>
              <SHeaderButton>Swap</SHeaderButton>
            </SCustomLink> */}
            {/* <SCustomLink
              to="/app/analytics"
              onClick={navProps.handleClickCloseMenu}
            >
              <SHeaderButton>Analytics</SHeaderButton>
            </SCustomLink> */}
            <SCustomLink
              to='/app/pools'
              // onClick={navProps.handleClickCloseMenu}
            >
              <SHeaderButton>Pools</SHeaderButton>
            </SCustomLink>
            <SCustomLink
              to='/app/seed-liquidity'
              // onClick={navProps.handleClickCloseMenu}
            >
              <SHeaderButton>Seed Liquidity</SHeaderButton>
            </SCustomLink>
            {/* <Modal /> */}
            <a
              href='https://twitter.com/price_oracle'
              // onClick={navProps.handleClickCloseMenu}
            >
              <SHeaderButton>
                <div>Documentation</div>
                <Icon name='arrow-up-right' size={FONT_SIZE_16()} padding={SPACING_8()} color={theme.textSecondary} />
              </SHeaderButton>
            </a>
          </Section>
        </Item>
        <SNavigatorItemRight>
          <ConnectButton />
          <div>
            {/* <ThemeButtonContainer onClick={toggleTheme}>
            <Icon color={theme.textSecondary} name={themeIcon} />
          </ThemeButtonContainer> */}
          </div>
        </SNavigatorItemRight>
      </SNavigator>
    </Container>
  );
};

export default AppNavigator;
