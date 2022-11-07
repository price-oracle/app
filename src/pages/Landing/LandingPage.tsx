import HeaderBoxes from './HeaderBoxes';
import {
  Container,
  StyledLogo,
  MiddleContent,
  TopContent,
  TextContainer,
  Link,
  EnterBoxButton,
  BottomContent,
} from './LandingPage.styles';
import { Typography } from '~/components/shared';
import { Link as RouterLink } from 'react-router-dom';
// import useInnerHeight from '../../../../hooks/useInnerHeight';

function LandingPage() {
  const height = window.innerHeight;

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
        <Link href='https://twitter.com/price_oracle'>
          <Typography>Documentation</Typography>
        </Link>
      </MiddleContent>
      <BottomContent>
        <Typography allowWrap variant='small'>
          Made with 🤍 by the Wonderland team
        </Typography>
      </BottomContent>
    </Container>
  );
}

export default LandingPage;
