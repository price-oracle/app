import styled from 'styled-components';

import InputNumber from '~/components/shared/InputNumber';
import {
  Loading,
  PoolIcon,
  PriceIcon,
  SecondaryButton,
  BoxButton,
  SPACING_16,
  SPACING_8,
  SPACING_24,
} from '~/components/shared';
import { PoolManager } from '~/types/PoolManager';

const InputContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
  display: grid;
  padding: ${SPACING_16};
`;

const Title = styled.h2`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: ${SPACING_24};
  margin-bottom: ${SPACING_24};
`;

const SBoxButton = styled(BoxButton)`
  margin: 10px 0;
  padding: 6px 40px;
  text-align: center;
  width: 100%;
`;

const SInputNumber = styled(InputNumber)`
  border: ${(props) => props.theme.border};
  padding: ${SPACING_8};
  width: 100%;
`;

const Label = styled.label`
  align-items: center;
  display: grid;
  grid-column-gap: ${SPACING_8};
  grid-template-columns: repeat(3, auto);
  margin-bottom: ${SPACING_16};
  width: fit-content;
`;

const Text = styled.div`
  margin-left: 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin: 10px 0;
`;

const Lock = ({ modalProps }: any) => {
  const tokenAmount = InputNumber.useProps();

  // temporary:
  const isLoading = false;
  const params = {
    title: 'Lock',
    buttonText: 'Approve',
    balance: '1000',
  };

  return (
    <Container>
      <Title>
        <PoolIcon address={modalProps.token.tokenAddress} />
        <Text>Lock in {modalProps.name}</Text>
      </Title>

      <Label>
        Balance: <PriceIcon /> {params.balance}
      </Label>

      <InputContainer>
        <SInputNumber {...tokenAmount} />
        <SecondaryButton onClick={() => console.log('handleClickSetMaxValue()')}>Max</SecondaryButton>
      </InputContainer>

      {isLoading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}

      {!isLoading && (
        <SBoxButton onClick={() => console.log('handleClickAction()')} disabled={tokenAmount.value === ''}>
          {params.buttonText}
        </SBoxButton>
      )}
    </Container>
  );
};

export default Lock;
