import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { SPACING_16, SPACING_8, Typography } from '~/components/shared';
import InputNumber from '~/components/shared/InputNumber';
import { ERC20Service } from '~/services';
import { Token } from '~/types/Token';
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

interface DepositAmountsProps {
  selectedToken: Token | undefined;
}

const DepositAmountsSection = ({ selectedToken }: DepositAmountsProps) => {
  const tokenInput = InputNumber.useProps({
    onChange: (value: any) => {
      // const result = toFixedUnit(value, selectedToken!.decimals);
      // dispatch(setTokenAmount(result));
      console.log(value);
    },
    // forceReset,
  });

  const erc20Service = new ERC20Service();

  const priceInput = InputNumber.useProps({
    onChange: (value: any) => console.log('dispatch(setPriceAmount(toFixedUnit(value)))'),
  });

  const priceBalance = '2000';
  const eth_symbol = 'WETH';

  const [tokenBalance, setTokenBalance] = useState<string>('0');

  useEffect(() => {
    selectedToken &&
      erc20Service.fetchTokenBalance(selectedToken.address).then((balance) => setTokenBalance(balance.toString()));
  }, [selectedToken]);

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
