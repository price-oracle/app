import styled from 'styled-components';
import { SPACING_12, SPACING_24, SPACING_32, MOBILE_MAX_WIDTH } from '~/components/shared';
import { ZINDEX } from '~/config/constants/misc';

export interface IStylesProps {
  differenceMixBlend?: boolean;
}
export const Nav = styled.nav<IStylesProps>`
  position: relative;
  mix-blend-mode: ${(props) => (props.differenceMixBlend ? 'difference' : 'unset')};
  width: 100%;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
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
`;

export const CollapsableList = styled(List)`
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    align-items: flex-end;
    background-color: ${(props) => props.theme.background};
    border: ${(props) => props.theme.borderPrimary};
    flex-direction: column;
    padding: 0;
    position: absolute;
    right: ${SPACING_24};
    top: ${SPACING_24};
    width: fit-content;
    z-index: ${ZINDEX.action};
  }
`;

export const Item = styled.section`
  a {
    display: block;
    padding: ${SPACING_12};
    text-decoration: none;
  }
`;
