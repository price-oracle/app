import {
  AppNavigatorButtonContainer,
  AppNavigatorContainer,
  Container,
  NavContainer,
  PriceLogoNavItem,
  ScamAlert,
  SCustomLink,
  Section,
  SHeaderButton,
  SNavigator,
  SNavigatorItemRight,
  StyledLogo,
} from './AppNavigator.styles';
import {
  ConnectButton,
  FONT_SIZE_12,
  Icon,
  SPACING_8,
  getTheme,
  ThemeButton,
  ExternalLink,
  Typography,
} from '~/components/shared';
import { useWindowDimensions, useAppSelector } from '~/hooks';
import { Item } from '../Navigator/Navigator.styles';
import { useNavigatorProps } from '../Navigator/Navigator';

const AppNavigator = () => {
  const currentTheme = useAppSelector(({ theme }) => theme.current);
  const theme = getTheme(currentTheme);
  const { isMobile } = useWindowDimensions();
  const navProps = useNavigatorProps(true);

  return (
    <NavContainer>
      <ScamAlert weight='semibold'>
        <Typography weight='bold' color='background'>
          BEWARE:
        </Typography>{' '}
        Price Oracle is experimental and has not yet been audited
      </ScamAlert>
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
              <SCustomLink to='/app/pools'>
                <SHeaderButton>Pools</SHeaderButton>
              </SCustomLink>
              <SCustomLink to='/app/seed-liquidity'>
                <SHeaderButton>Seed Liquidity</SHeaderButton>
              </SCustomLink>
              <ExternalLink href='https://docs.oracles.rip/'>
                <SHeaderButton>
                  Documentation
                  <Icon name='arrow-up-right' size={FONT_SIZE_12()} padding={SPACING_8()} color={theme.textPrimary} />
                </SHeaderButton>
              </ExternalLink>
            </Section>
          </Item>

          <SNavigatorItemRight>
            <AppNavigatorContainer>
              <ConnectButton />
            </AppNavigatorContainer>
            <AppNavigatorButtonContainer aria-label='change theme'>
              <ThemeButton />
            </AppNavigatorButtonContainer>
          </SNavigatorItemRight>
        </SNavigator>
      </Container>
    </NavContainer>
  );
};

export default AppNavigator;
