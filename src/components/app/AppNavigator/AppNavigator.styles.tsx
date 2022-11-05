import styled from 'styled-components';

import Navigator from '../Navigator';
import {
  THEME_BORDER,
  THEME_TEXT_PRIMARY,
  MOBILE_MAX_WIDTH,
  SPACING_12,
  SPACING_128,
  SPACING_24,
  SPACING_64,
  SPACING_8,
  SPACING_96,
  Logo,
  CustomLink,
  HeaderButton,
} from '~/components/shared';
import { Item } from '../Navigator/Navigator.styles';

export const StyledLogo = styled(Logo)`
  color: ${THEME_TEXT_PRIMARY};
  display: block;
  width: ${SPACING_96};
  padding-bottom: ${SPACING_8};
`;

export const Container = styled.header`
  display: flex;
  height: ${SPACING_128};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    justify-content: space-between;
    height: ${SPACING_64};
  }
`;

export const Section = styled.section`
  display: flex;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-direction: column;
  }
`;

export const ThemeButtonContainer = styled(HeaderButton)`
  align-items: center;
  display: flex;
`;

export const SCustomLink = styled(CustomLink)`
  padding: 0;

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
  color: ${THEME_TEXT_PRIMARY};
`;

export const SNavigator = styled(Navigator)`
  justify-content: space-between;
  border-bottom: ${THEME_BORDER};
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
