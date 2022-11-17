import styled from 'styled-components';

import { SPACING_16, SPACING_8, Typography } from '~/components/shared';
import InputNumber from '~/components/shared/InputNumber';
import Balance from './Balance';
import Deposit from './Deposit';

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${SPACING_16};
  row-gap: ${SPACING_8};
`;

const Title = styled(Typography).attrs({
  variant: 'x-large',
})`
  grid-column-start: span 2;
  margin-bottom: ${SPACING_16};
  text-align: start;
  margin-top: ${SPACING_16};
`;

const DepositAmountsSection = () => {
  const tokenInput = InputNumber.useProps({
    onChange: (value: any) => {
      // const result = toFixedUnit(value, selectedToken!.decimals);
      // dispatch(setTokenAmount(result));
      console.log(value);
    },
    // forceReset,
  });

  const priceInput = InputNumber.useProps({
    onChange: (value: any) => console.log('dispatch(setPriceAmount(toFixedUnit(value)))'),
  });

  // temporary fixed values
  const selectedToken = {
    symbol: 'TUSD',
    logoURI: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png`,
    name: 'TrueUSD',
    decimals: 18,
  };
  const tokenBalance = '100';
  const priceBalance = '2000';
  const eth_symbol = 'WETH';

  return (
    <Container>
      <Title>Deposit amounts</Title>

      <Deposit>
        <Deposit.Token src={selectedToken?.logoURI} />
        <Deposit.Amount {...tokenInput} />
        <Deposit.Symbol>
          <Typography>{selectedToken?.symbol || ''}</Typography>
        </Deposit.Symbol>
      </Deposit>

      <Deposit>
        <Deposit.Token isPrice />
        <Deposit.Amount {...priceInput} />
        <Deposit.Symbol>{eth_symbol}</Deposit.Symbol>
      </Deposit>

      <Balance
        totalAmount={tokenBalance}
        symbol={selectedToken?.symbol || ''}
        onClick={() => console.log('handleClickTokenBalance')}
        decimals={selectedToken?.decimals}
      />

      <Balance totalAmount={priceBalance} symbol={eth_symbol} onClick={() => console.log('handleClickPriceBalance')} />
    </Container>
  );
};

export default DepositAmountsSection;
