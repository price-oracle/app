import styled, { keyframes } from 'styled-components';
import { Icon } from './Icon';

const Container = styled.div``;

const infiniteRotate = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const StyledIcon = styled(Icon)`
  animation: ${infiniteRotate} 2s linear infinite;
`;

interface IProps {
  className?: string;
}

export const Loading = ({ className }: IProps) => {
  return (
    <Container>
      <StyledIcon name='loader' data-testid='loader-icon' className={className} />
    </Container>
  );
};
