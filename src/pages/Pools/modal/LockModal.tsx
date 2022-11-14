import {
  Container,
  Title,
  SInputNumber,
  Label,
  SBoxButton,
  InputContainer,
  LoadingContainer,
  Text,
} from './LockModal.styles';
import { InputNumber, Loading, PoolIcon, PriceIcon, SecondaryButton } from '~/components/shared';

const LockModal = (/* receive all params: title, buttonText, balance & pool */) => {
  const tokenAmount = InputNumber.useProps();

  // temporary:
  const isLoading = false;
  const params = {
    title: 'Lock',
    buttonText: 'Approve',
    balance: '1000',
    pool: {
      name: 'TUSD-WETH',
      apy: '11',
      address: '0x0000000000085d4780B73119b644AE5ecd22b376',
      fee: '2',
      locked: 'test',
      claimable: 'test',
    },
  };

  //TODO: Get this as a parameter and merge with the params const
  const pool = {
    address: '0x0000000000085d4780B73119b644AE5ecd22b376',
    fee: '2%',
    token: {
      tokenAddress: 'test',
      tokenSymbol: 'test',
    },
    lockManagerAddress: 'test',
  };

  return (
    <Container>
      <Title>
        <PoolIcon pool={pool} />
        <Text>
          {params.title} in {params.pool.name}
        </Text>
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

export default LockModal;
