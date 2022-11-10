import styled from 'styled-components';

import Navigator from '../Navigator';
import {
  MOBILE_MAX_WIDTH,
  SPACING_12,
  SPACING_128,
  SPACING_24,
  SPACING_64,
  SPACING_96,
  Logo,
  CustomLink,
  HeaderButton,
} from '~/components/shared';
import { Item } from '../Navigator/Navigator.styles';

export const StyledLogo = styled(Logo)`
  color: ${(props) => props.theme.textPrimary};
  display: block;
  width: ${SPACING_96};
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
`;

export const SNavigator = styled(Navigator)`
  justify-content: space-between;
  border-bottom: ${(props) => props.theme.border};
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
