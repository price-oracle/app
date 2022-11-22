import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { isUndefined } from 'lodash';

import { SPACING_16, SPACING_8, Typography } from '~/components/shared';
import InputNumber from '~/components/shared/InputNumber';
import { getConfig } from '~/config';
import { ERC20Service } from '~/services';
import { Token } from '~/types/Token';
import { toUnit } from '~/utils/format';
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
  const bigNumberZero = new BigNumber(0);
  const { address: userAddress } = useAccount();

  const {
    ADDRESSES: { WETH_ADDRESS },
  } = getConfig();

  const tokenInput = InputNumber.useProps({
    onChange: (value: any) => {
      // const result = toFixedUnit(value, selectedToken!.decimals);
      // dispatch(setTokenAmount(result));
      console.log(value);
    },
    // forceReset,
  });

  const erc20Service = new ERC20Service();

  const wethInput = InputNumber.useProps({
    onChange: (value: any) => console.log('dispatch(setPriceAmount(toFixedUnit(value)))'),
  });

  const eth_symbol = 'WETH';

  const [tokenBalance, setTokenBalance] = useState<BigNumber | undefined>();
  const [wethBalance, setWethBalance] = useState<BigNumber | undefined>();

  useEffect(() => {
    if (isUndefined(tokenBalance)) {
      selectedToken &&
        erc20Service.fetchTokenBalance(selectedToken.address, userAddress).then((balance) => setTokenBalance(balance));
    }
  }, [selectedToken, tokenBalance]);

  useEffect(() => {
    if (isUndefined(wethBalance)) {
      erc20Service.fetchTokenBalance(WETH_ADDRESS, userAddress).then((wethBalance) => setWethBalance(wethBalance));
    }
  }, [wethBalance, userAddress]);

  useEffect(() => {
    // Reset to undefined to restart the useEffect hook
    setTokenBalance(undefined);
  }, [selectedToken]);

  const inputMaxWethBalance = () => wethBalance && wethInput.set(toUnit(wethBalance.toString(), 18));
  const inputMaxTokenBalance = () =>
    tokenBalance && tokenInput.set(toUnit(tokenBalance.toString(), selectedToken?.decimals));

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
        <Deposit.Amount {...wethInput} />
        <Deposit.Symbol>{eth_symbol}</Deposit.Symbol>
      </Deposit>

      <Balance
        totalAmount={tokenBalance || bigNumberZero}
        symbol={selectedToken?.symbol || ''}
        onClick={inputMaxTokenBalance}
        decimals={selectedToken?.decimals}
      />

      <Balance totalAmount={wethBalance || bigNumberZero} symbol={eth_symbol} onClick={inputMaxWethBalance} />
    </Container>
  );
};

export default DepositAmountsSection;
