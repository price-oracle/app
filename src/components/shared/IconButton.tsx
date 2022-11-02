import React from 'react';
import styled from 'styled-components';

import { MOBILE_MAX_WIDTH } from './Variables';
import { Icon, IconName } from './Icon';
import { SPACING_12 } from './Variables';

interface ContainerProps {
  flip?: boolean;
  fontSize?: string;
  padding?: string;
}

const Container = styled.div<ContainerProps>`
  padding: ${SPACING_12};

  @media (max-width: ${MOBILE_MAX_WIDTH}) {
    width: fit-content;

    ${(props) => (props.flip ? `transform: rotate(180deg);` : '')}
  }
`;

type Props = React.HTMLAttributes<HTMLElement> &
  ContainerProps & {
    className?: string;
    color?: string;
    fontSize?: string;
    name: IconName;
    padding?: string;
  };

export const IconButton = ({ className, color, name, ...restProps }: Props) => (
  <Container className={className} {...restProps}>
    <Icon color={color} name={name} />
  </Container>
);
