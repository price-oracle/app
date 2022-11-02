import { Link, LinkProps, useResolvedPath, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import { THEME_DIVIDER, THEME_TEXT_PRIMARY } from '~/components/shared';

const StyledLink = styled(Link)<{ selected?: boolean }>`
  color: ${THEME_TEXT_PRIMARY};
  text-decoration: none;
  position: relative;

  ${(props) =>
    props.selected &&
    `
    &:before {
      background-color: ${THEME_DIVIDER(props)};
      bottom: 0;
      content: '';
      height: 10px;
      left: 48%;
      position: absolute;
      transform: translateX(50%);
      width: 2px;
    }
  `}
`;

export const CustomLink = ({ children, to, ...props }: LinkProps) => {
  const resolved = useResolvedPath(to);
  const match = Boolean(useMatch({ path: resolved.pathname, end: true }));

  return (
    <StyledLink selected={!!match} to={to} {...props}>
      {children}
    </StyledLink>
  );
};
