import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { isUndefined } from 'lodash';

import { SPACING_16, SPACING_8, MOBILE_MAX_WIDTH, Typography } from '~/components/shared';
import InputNumber from '~/components/shared/InputNumber';
import { getConfig } from '~/config';
import { ERC20Service } from '~/services';
import { Token } from '~/types';
import { toUnit } from '~/utils';
import Balance from './Balance';
import Deposit from './Deposit';

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${SPACING_16};
  row-gap: ${SPACING_8};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: flex;
    flex-direction: column;
  }
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
  startingPrice: BigNumber;
}

const DepositAmountsSection = ({ selectedToken, startingPrice }: DepositAmountsProps) => {
  const bigNumberZero = new BigNumber(0);
  const { address: userAddress } = useAccount();

  const {
    ADDRESSES: { WETH_ADDRESS },
  } = getConfig();

  const onWethAmountChanged = (amount: string) => {
    const price = new BigNumber(startingPrice);
    const wethAmount = new BigNumber(amount);
    const tokenAmount = wethAmount.multipliedBy(price);
    if (tokenAmount.isNaN()) {
      tokenInput.reset();
    } else {
      tokenInput.set(tokenAmount.toString());
    }
  };

  const onTokenAmountChanged = (amount: string) => {
    const price = new BigNumber(startingPrice);
    const tokenAmount = new BigNumber(amount);
    const wethAmount = tokenAmount.dividedBy(price);
    if (wethAmount.isNaN() || price.isZero()) {
      wethInput.reset();
    } else {
      wethInput.set(wethAmount.toString());
    }
  };

  const tokenInput = InputNumber.useProps({
    onChange: onTokenAmountChanged,
    initialValue: '0',
  });

  const erc20Service = new ERC20Service();

  const wethInput = InputNumber.useProps({
    onChange: onWethAmountChanged,
    initialValue: '0',
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

  useEffect(() => {
    onTokenAmountChanged(tokenInput.value);
  }, [startingPrice]);

  const inputMaxWethBalance = () => {
    if (wethBalance) {
      const newValue = toUnit(wethBalance.toString(), 18);
      wethInput.set(newValue);
      onWethAmountChanged(newValue);
    }
  };

  const inputMaxTokenBalance = () => {
    if (tokenBalance) {
      const newValue = toUnit(tokenBalance.toString(), selectedToken?.decimals);
      tokenInput.set(newValue);
      onTokenAmountChanged(newValue);
    }
  };

  return (
    <Container>
      <Title>Deposit amounts</Title>

      <div>
        <Deposit>
          <Deposit.Token src={selectedToken?.logoURI} />
          <Deposit.Amount {...tokenInput} />
          <Deposit.Symbol>
            <Typography>{selectedToken?.symbol || ''}</Typography>
          </Deposit.Symbol>
        </Deposit>
        <Balance
          totalAmount={tokenBalance || bigNumberZero}
          symbol={selectedToken?.symbol || ''}
          onClick={inputMaxTokenBalance}
          decimals={selectedToken?.decimals}
        />
      </div>

      <div>
        <Deposit>
          <Deposit.Token isPrice />
          <Deposit.Amount {...wethInput} />
          <Deposit.Symbol>{eth_symbol}</Deposit.Symbol>
        </Deposit>

        <Balance totalAmount={wethBalance || bigNumberZero} symbol={eth_symbol} onClick={inputMaxWethBalance} />
      </div>
    </Container>
  );
};

export default DepositAmountsSection;
