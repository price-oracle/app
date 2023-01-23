import { useEffect, useState } from 'react';
import { useChainModal } from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork } from 'wagmi';

import {
  AppNavigatorButtonContainer,
  AppNavigatorContainer,
  ChainButton,
  ChainIcon,
  Container,
  NavContainer,
  PriceLogoNavItem,
  ScamAlert,
  SCustomLink,
  Section,
  SExternalLink,
  SHeaderButton,
  SNavigator,
  SNavigatorItemRight,
  StyledLogo,
} from './AppNavigator.styles';
import { ConnectButton, ThemeButton, ExternalLink, Typography } from '~/components/shared';
import { useWindowDimensions } from '~/hooks';
import { Item } from '../Navigator/Navigator.styles';
import { useNavigatorProps } from '../Navigator/Navigator';
import { getChains } from '~/utils';

const AppNavigator = () => {
  const navProps = useNavigatorProps(true);
  const { openChainModal } = useChainModal();
  const { isMobile, isTablet } = useWindowDimensions();
  const [chainName, setChainName] = useState(getChains()[0].name);
  const { chain } = useNetwork();
  const { address } = useAccount();

  const multichainEnabled = getChains().length > 1 && address;

  useEffect(() => {
    if (chain) {
      chain.unsupported ? setChainName('Unsupported Network') : setChainName(chain.name);
    }
  }, [chain, address]);

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
                <SCustomLink to='/' data-testid='to-landing-page'>
                  <SHeaderButton as={StyledLogo} />
                </SCustomLink>
              )}
              <SCustomLink to='/app/pools' data-testid='to-pools-page'>
                <SHeaderButton>Pools</SHeaderButton>
              </SCustomLink>
              <SCustomLink to='/app/seed-liquidity' data-testid='to-seedliquidity-page'>
                <SHeaderButton>Seed Liquidity</SHeaderButton>
              </SCustomLink>
              {(!isTablet || isMobile) && (
                <>
                  <ExternalLink href='https://docs.oracles.rip/'>
                    <SExternalLink>Documentation</SExternalLink>
                  </ExternalLink>
                  <ExternalLink href='https://discord.gg/c9KSUgu3vt'>
                    <SExternalLink>Discord</SExternalLink>
                  </ExternalLink>
                </>
              )}
            </Section>
          </Item>

          <SNavigatorItemRight>
            <AppNavigatorContainer>
              <ChainButton onClick={openChainModal} disabled={!multichainEnabled}>
                <ChainIcon name='ethereum' />
                {chainName}
              </ChainButton>
            </AppNavigatorContainer>
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
