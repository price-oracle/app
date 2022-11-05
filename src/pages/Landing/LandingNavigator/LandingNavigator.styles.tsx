import styled from 'styled-components';
import { SPACING_16, SPACING_32, MOBILE_MAX_WIDTH } from '~/components/shared';

export const Nav = styled.nav`
  mix-blend-mode: difference;
  position: relative;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    mix-blend-mode: unset;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  position: absolute;
  right: ${SPACING_32};
  top: ${SPACING_32};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    background-color: #000;
    border: 2px solid white;
    flex-direction: column;
    padding: 0;
    right: ${SPACING_16};
    top: ${SPACING_16};
    z-index: 1;
  }
`;

export const ListItem = styled.li`
  a {
    display: block;
    padding: 10px;
    text-decoration: none;

    @media (max-width: ${MOBILE_MAX_WIDTH}px) {
      padding: 15px;

      & i {
        font-size: 35px;
      }
    }
  }
`;
