import styled from 'styled-components';
import {
  SPACING_12,
  SPACING_24,
  SPACING_32,
  THEME_BACKGROUND,
  THEME_BORDER,
  MOBILE_MAX_WIDTH,
} from '~/components/shared';

export interface IStylesProps {
  differenceMixBlend?: boolean;
}
export const Nav = styled.nav<IStylesProps>`
  position: relative;
  mix-blend-mode: ${(props) => (props.differenceMixBlend ? 'difference' : 'unset')};

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    mix-blend-mode: unset;
  }
`;

export const List = styled.section`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: end;
  list-style-type: none;
  right: ${SPACING_32};
  top: ${SPACING_32};
  width: 100vw;

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    align-items: flex-end;
    background-color: ${THEME_BACKGROUND};
    border: ${THEME_BORDER};
    flex-direction: column;
    padding: 0;
    position: absolute;
    right: ${SPACING_24};
    top: ${SPACING_24};
    width: fit-content;
    z-index: 1;
  }
`;

export const Item = styled.section`
  a {
    display: block;
    padding: ${SPACING_12};
    text-decoration: none;
  }
`;
