// import { useDispatch, useSelector } from 'react-redux';
import {
  AppNavigatorButtonContainer,
  AppNavigatorContainer,
  Container,
  PriceLogoNavItem,
  SCustomLink,
  Section,
  SHeaderButton,
  SNavigator,
  SNavigatorItemRight,
  StyledLogo,
} from './AppNavigator.styles';

// import {
//   selectWalletConnected,
//   selectWalletStatus,
// } from '../../../../features/wallet/state/wallet.selectors';
// import { useThemeButtonProps } from '../../../../components/atoms/ThemeButton';
// import Modal from '../../../../features/modal/components/molecules/Modal/Modal';
import { ConnectButton, FONT_SIZE_16, Icon, SPACING_8, getTheme, ThemeButton } from '~/components/shared';

import { Item } from '../Navigator/Navigator.styles';

import { useWindowDimensions } from '~/hooks/windowDimensions';
import { useAppSelector } from '~/hooks';
import { useNavigatorProps } from '../Navigator/Navigator';

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
  const currentTheme = useAppSelector(({ theme }) => theme.current);
  const theme = getTheme(currentTheme);
  // const walletConnected = useSelector(selectWalletConnected);
  // const [themeIcon, toggleTheme] = useThemeButtonProps();
  const { isMobile } = useWindowDimensions();
  const navProps = useNavigatorProps(true);
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

      <SNavigator {...navProps}>
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
          <AppNavigatorContainer>
            <ConnectButton />
          </AppNavigatorContainer>
          <AppNavigatorButtonContainer>
            <ThemeButton />
          </AppNavigatorButtonContainer>
        </SNavigatorItemRight>
      </SNavigator>
    </Container>
  );
};

export default AppNavigator;
