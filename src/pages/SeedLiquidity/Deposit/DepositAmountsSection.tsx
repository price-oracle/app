import { useEffect, useState } from 'react';
import { BigNumber, constants, utils } from 'ethers';
import styled from 'styled-components';
import { useAccount } from 'wagmi';

import { MOBILE_MAX_WIDTH, SPACING_16, SPACING_32, SPACING_8, Typography } from '~/components/shared';
import InputNumber from '~/components/shared/InputNumber';
import { getConfig } from '~/config';
import { useContracts } from '~/hooks';
import { FeeTier, Token, UniswapPool } from '~/types';
import { sanitizeDecimals } from '~/utils';
import Balance from './Balance';
import Deposit from './Deposit';
import SubmitFormSection from './SubmitFormSection';

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: ${SPACING_16};
  row-gap: ${SPACING_8};
  padding-bottom: ${SPACING_32};

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

const BalanceContainer = styled(Typography).attrs({
  variant: 'small',
  color: 'primary',
})`
  display: table;
  text-align: start;
  margin-top: ${SPACING_8};
`;

interface DepositAmountsProps {
  selectedToken: Token | undefined;
  startingPrice: BigNumber;
  uniswapPoolsForFeeTier: { [feeTier: string]: UniswapPool } | undefined;
  selectedFee: FeeTier;
}

const DepositAmountsSection = ({
  selectedToken,
  startingPrice,
  uniswapPoolsForFeeTier,
  selectedFee,
}: DepositAmountsProps) => {
  const { address: userAddress } = useAccount();
  const { erc20Service } = useContracts();
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
      tokenInput.set(
        sanitizeDecimals(utils.formatUnits(tokenAmount, selectedToken?.decimals), selectedToken?.decimals)
      );
    }
  };

  const onTokenAmountChanged = (amount: string) => {
    const tokenAmount = utils.parseUnits(sanitizeDecimals(amount, selectedToken?.decimals), selectedToken?.decimals);
    const wethAmount = constants.WeiPerEther.mul(tokenAmount).div(startingPrice);
    if (wethAmount.isZero() || startingPrice.isZero()) {
      wethInput.reset();
    } else {
      wethInput.set(utils.formatEther(wethAmount));
    }
  };

  const tokenInput = InputNumber.useProps({
    onChange: onTokenAmountChanged,
    initialValue: '',
  });

  const wethInput = InputNumber.useProps({
    onChange: onWethAmountChanged,
    initialValue: '',
  });

  useEffect(() => {
    if (userAddress) {
      selectedToken &&
        erc20Service
          .fetchTokenBalance([WETH_ADDRESS, selectedToken.address], userAddress)
          .then(([wethBalance, tokenBalance]) => {
            setWethBalance(wethBalance);
            setTokenBalance(tokenBalance);
          });
    }
  }, [selectedToken, tokenBalance?.toString(), wethBalance?.toString(), userAddress]);

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
        <Title weight='semibold'>Deposit amounts</Title>

        <div>
          <Deposit>
            <Deposit.Token isPrice />
            <Deposit.Amount {...wethInput} aria-label='weth amount' />
            <Deposit.Symbol>{eth_symbol}</Deposit.Symbol>
          </Deposit>
          <BalanceContainer>
            <Balance totalAmount={wethBalance} symbol={eth_symbol} onClick={inputMaxWethBalance} />
          </BalanceContainer>
        </div>

        <div>
          <Deposit>
            <Deposit.Token src={selectedToken?.logoURI} />
            <Deposit.Amount {...tokenInput} aria-label='token amount' />
            <Deposit.Symbol>
              <Typography>{selectedToken?.symbol || ''}</Typography>
            </Deposit.Symbol>
          </Deposit>
          <BalanceContainer>
            <Balance
              totalAmount={tokenBalance}
              symbol={selectedToken?.symbol || ''}
              onClick={inputMaxTokenBalance}
              decimals={selectedToken?.decimals}
            />
          </BalanceContainer>
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
        startingPrice={startingPrice}
        uniswapPoolsForFeeTier={uniswapPoolsForFeeTier}
        selectedFee={selectedFee}
      />
    </>
  );
};

export default DepositAmountsSection;
