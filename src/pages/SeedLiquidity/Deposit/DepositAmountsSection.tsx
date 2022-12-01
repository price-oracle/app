import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { isUndefined } from 'lodash';
import { BigNumber, utils, constants } from 'ethers';

import { SPACING_16, SPACING_8, MOBILE_MAX_WIDTH, Typography } from '~/components/shared';
import InputNumber from '~/components/shared/InputNumber';
import { getConfig } from '~/config';
import { ERC20Service } from '~/services';
import { Token } from '~/types';
import Balance from './Balance';
import Deposit from './Deposit';
import SubmitFormSection from './SubmitFormSection';
import { sanitizeDecimals } from '~/utils';

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
  const { address: userAddress } = useAccount();
  const erc20Service = new ERC20Service();
  const eth_symbol = 'WETH';
  const {
    ADDRESSES: { WETH_ADDRESS },
  } = getConfig();
  const [tokenBalance, setTokenBalance] = useState<BigNumber | undefined>(undefined);
  const [wethBalance, setWethBalance] = useState<BigNumber | undefined>(undefined);

  const onWethAmountChanged = (amount: string) => {
    const wethAmount = utils.parseEther(sanitizeDecimals(amount));
    const tokenAmount = wethAmount.mul(startingPrice).div(constants.WeiPerEther);
    if (tokenAmount.isZero()) {
      tokenInput.reset();
    } else {
      tokenInput.set(sanitizeDecimals(utils.formatEther(tokenAmount), selectedToken?.decimals));
    }
  };

  const onTokenAmountChanged = (amount: string) => {
    const tokenAmount = utils.parseEther(sanitizeDecimals(amount, selectedToken?.decimals));
    const wethAmount = constants.WeiPerEther.mul(tokenAmount).div(startingPrice);
    if (wethAmount.isZero() || startingPrice.isZero()) {
      wethInput.reset();
    } else {
      wethInput.set(utils.formatEther(wethAmount));
    }
  };

  const tokenInput = InputNumber.useProps({
    onChange: onTokenAmountChanged,
    initialValue: '0',
  });

  const wethInput = InputNumber.useProps({
    onChange: onWethAmountChanged,
    initialValue: '0',
  });

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
      const newValue = utils.formatEther(wethBalance);
      wethInput.set(newValue);
      onWethAmountChanged(newValue);
    }
  };

  const inputMaxTokenBalance = () => {
    if (tokenBalance) {
      const newValue = utils.formatUnits(tokenBalance, selectedToken?.decimals);
      tokenInput.set(newValue);
      onTokenAmountChanged(newValue);
    }
  };

  return (
    <>
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
            totalAmount={tokenBalance || '0'}
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

          <Balance totalAmount={wethBalance || '0'} symbol={eth_symbol} onClick={inputMaxWethBalance} />
        </div>
      </Container>
      <SubmitFormSection
        tokenAmount={utils.parseUnits(
          sanitizeDecimals(tokenInput.value, selectedToken?.decimals),
          selectedToken?.decimals
        )}
        wethAmount={utils.parseEther(sanitizeDecimals(wethInput.value))}
        wethBalance={wethBalance || constants.Zero}
        tokenBalance={tokenBalance || constants.Zero}
        selectedToken={selectedToken}
      />
    </>
  );
};

export default DepositAmountsSection;
