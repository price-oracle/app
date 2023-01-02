import { Link as RouterLink } from 'react-router-dom';

import HeaderBoxes from './HeaderBoxes';
import {
  Container,
  StyledLogo,
  MiddleContent,
  TopContent,
  TextContainer,
  EnterBoxButton,
  BottomContent,
  DocsContainer,
} from './LandingPage.styles';
import { Icon, Typography, FONT_SIZE_12, SPACING_8, getTheme, ExternalLink } from '~/components/shared';
import { useAppSelector } from '~/hooks';

function LandingPage() {
  const height = window.innerHeight;
  const currentTheme = useAppSelector(({ theme }) => theme.current);
  const theme = getTheme(currentTheme);

  return (
    <Container height={height}>
      <TopContent>
        <HeaderBoxes />
      </TopContent>
      <MiddleContent>
        <StyledLogo />
        <TextContainer>
          <Typography allowWrap variant='large'>
            Reliable, secure, and permissionless price oracles for every token.
          </Typography>
        </TextContainer>
        <RouterLink to='/app/pools'>
          <EnterBoxButton>Enter App</EnterBoxButton>
        </RouterLink>
        <DocsContainer>
          <ExternalLink href='https://docs.oracles.rip/' value='Documentation'>
            <Icon name='arrow-up-right' size={FONT_SIZE_12()} padding={SPACING_8()} color={theme.textPrimary} />
          </ExternalLink>
        </DocsContainer>
      </MiddleContent>
      <BottomContent>
        <Typography allowWrap variant='small'>
          Made with 🤍 by <ExternalLink href='https://defi.sucks/' value='Wonderland' variant='small' />
        </Typography>
      </BottomContent>
    </Container>
  );
}

export default LandingPage;
