import { ReactElement } from 'react';
import styled from 'styled-components';

import { Typography, TypographyVariant } from './Typography';

export const Link = styled(Typography)`
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const SLink = styled.a``;
const SText = styled(Typography)``;

interface Props {
  href: string;
  value?: string;
  variant?: TypographyVariant;
  children?: ReactElement;
}

export const ExternalLink = ({ href, value, variant, children }: Props) => {
  return (
    <SLink href={href} target='_blank' rel='noopener noreferrer'>
      <SText variant={variant}>
        {value} {children}
      </SText>
    </SLink>
  );
};
