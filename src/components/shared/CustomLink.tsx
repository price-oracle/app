import { Link, LinkProps, useResolvedPath, useMatch } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)<{ selected?: boolean }>`
  color: ${(props) => props.theme.textPrimary};
  text-decoration: none;
  position: relative;

  ${(props) =>
    props.selected &&
    `
    &:before {
      background-color: ${props.theme.divider};
      bottom: -1rem;
      content: '';
      height: 2rem;
      left: 48%;
      position: absolute;
      transform: translateX(50%);
      width: 0.2rem;
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
