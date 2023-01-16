import styled from 'styled-components';

import Navigator from '../Navigator';
import {
  MOBILE_MAX_WIDTH,
  SPACING_12,
  FONT_SIZE_16,
  SPACING_128,
  SPACING_24,
  SPACING_64,
  SPACING_96,
  Logo,
  CustomLink,
  HeaderButton,
  Typography,
} from '~/components/shared';
import { Item } from '../Navigator/Navigator.styles';
import { ZINDEX } from '~/config/constants/misc';

export const StyledLogo = styled(Logo)`
  color: ${(props) => props.theme.textPrimary};
  display: block;
  width: ${SPACING_96};
`;

export const Container = styled.header`
  display: flex;
  height: ${SPACING_128};
  font-size: ${FONT_SIZE_16};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    justify-content: space-between;
    height: ${SPACING_64};
  }
`;

export const Section = styled.section`
  display: flex;
  padding-left: 2.4rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-direction: column;
  }
`;

export const AppNavigatorContainer = styled.div`
  align-items: center;
  display: flex;
`;

export const AppNavigatorButtonContainer = styled(HeaderButton)`
  align-items: center;
  display: flex;
`;

export const SCustomLink = styled(CustomLink)`
  padding: 0;
  margin-right: 2rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    &::before {
      display: none;
    }

    a {
      padding: ${SPACING_24} !important;
    }
  }
`;

export const SHeaderButton = styled(HeaderButton)`
  height: 100%;
  color: ${(props) => props.theme.textPrimary};
  font-family: 'PlusJakartaSansSemiBold';
`;

export const SNavigator = styled(Navigator)`
  justify-content: space-between;
  border-bottom: ${(props) => props.theme.borderPrimary};
`;

export const SNavigatorItemRight = styled(Item)`
  display: flex;

  & > * {
    padding: ${SPACING_12};
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const PriceLogoNavItem = styled(Item)`
  padding: ${SPACING_12};
`;

export const ScamAlert = styled(Typography)`
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.background};
  padding: 0.4rem 0;
  width: 100%;
  font-size: 1.4rem;
  z-index: ${ZINDEX.tooltip};

  & * {
    font-size: 1.4rem;
  }

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: none;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SExternalLink = styled(SHeaderButton)`
  padding-right: 2rem;
`;
