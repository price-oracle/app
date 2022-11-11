import styled from 'styled-components';

import { BoxButton, Loading } from '~/components/shared';

const Container = styled.section`
  display: grid;
  flex-direction: column;
  justify-content: center;
`;

const SBoxButton = styled(BoxButton)`
  width: 25rem;
`;

const SubmitFormSection = () => {
  // temporary fixed values
  const feeCardProps = {
    created: false,
  };
  const isInvalid = false;
  const isLoading = false;

  return (
    <Container>
      <SBoxButton onClick={() => console.log('handleClick')} disabled={isLoading || isInvalid}>
        {isLoading && <Loading />}
        {!isLoading && feeCardProps?.created ? 'Add Liquidity' : 'Create Pool'}
      </SBoxButton>
    </Container>
  );
};

export default SubmitFormSection;
