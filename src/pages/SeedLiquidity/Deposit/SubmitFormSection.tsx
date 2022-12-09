import { useEffect, useState } from 'react';
import { BigNumber, constants } from 'ethers';
import styled from 'styled-components';
import { useAccount } from 'wagmi';
import { isUndefined } from 'lodash';

import { calculateLiquidity, getSqrtPriceX96ForToken } from '~/utils';
import { BoxButton, Loading, SPACING_32 } from '~/components/shared';
import { getConfig } from '~/config';
import { useAppSelector, useContracts, useUpdateState } from '~/hooks';
import { Address, FeeTier, Token, UniswapPool } from '~/types';

const Container = styled.section`
  display: grid;
  flex-direction: column;
  justify-content: center;
  padding-bottom: ${SPACING_32};
`;

const SBoxButton = styled(BoxButton)`
  width: 35rem;
`;

interface AmountsProps {
  tokenAmount: BigNumber;
  tokenBalance: BigNumber;
  wethAmount: BigNumber;
  wethBalance: BigNumber;
  selectedToken: Token | undefined;
  startingPrice: BigNumber;
  uniswapPoolsForFeeTier: { [feeTier: string]: UniswapPool } | undefined;
  selectedFee: FeeTier;
}

const SubmitFormSection = ({
  tokenAmount,
  wethAmount,
  tokenBalance,
  wethBalance,
  selectedToken,
  startingPrice,
  uniswapPoolsForFeeTier,
  selectedFee,
}: AmountsProps) => {
  const { updatePoolState } = useUpdateState();
  const poolManagers = useAppSelector((state) => state.poolManagers.elements);
  const { poolManagerFactoryService, poolManagerService, erc20Service } = useContracts();

  const { address } = useAccount();
  const [isInvalid, setIsInvalid] = useState(false);
  const [wethAllowance, setWethAllowance] = useState<BigNumber>(constants.Zero);
  const [tokenAllowance, setTokenAllowance] = useState<BigNumber>(constants.Zero);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [poolManagerAddress, setPoolManagerAddress] = useState<Address>('');
  const {
    ADDRESSES: { WETH_ADDRESS },
  } = getConfig();

  const ethIsApproved = wethAmount.lte(wethAllowance);
  const isApproved = ethIsApproved && tokenAmount.lte(tokenAllowance);

  const isDisabled = isLoading || isInvalid || !address || tokenAmount.isZero() || wethAmount.isZero();

  const updateAllowanceAmount = (poolManagerAddress: Address) => {
    //TODO: Change to promise.all
    if (address && selectedToken?.address) {
      setIsLoading(true);
      erc20Service
        .fetchTokenAllowance(WETH_ADDRESS, poolManagerAddress, address)
        .then((allowance) => setWethAllowance(allowance))
        .finally(() => {
          setIsLoading(false);
        });
      erc20Service
        .fetchTokenAllowance(selectedToken.address, poolManagerAddress, address)
        .then((allowance) => setTokenAllowance(allowance))
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleApprove = () => {
    setIsLoading(true);
    if (!ethIsApproved)
      erc20Service.approveTokenAmount(WETH_ADDRESS, poolManagerAddress, wethAmount).then(() => {
        setIsLoading(false);
        updateAllowanceAmount(poolManagerAddress);
      });

    if (ethIsApproved)
      if (selectedToken?.address) {
        erc20Service.approveTokenAmount(selectedToken?.address, poolManagerAddress, tokenAmount).then(() => {
          setIsLoading(false);
          updateAllowanceAmount(poolManagerAddress);
        });
      }
  };

  useEffect(() => {
    setIsInvalid(tokenAmount.gt(tokenBalance) || wethAmount.gt(wethBalance));
  }, [tokenAmount, wethAmount, tokenBalance, wethBalance]);

  useEffect(() => {
    if (selectedToken?.address) {
      setPoolManagerAddress('');
      poolManagerFactoryService
        .getPoolManagerAddress(selectedToken?.address, selectedFee.fee)
        .then((poolManagerAddress) => {
          updateAllowanceAmount(poolManagerAddress);
          setPoolManagerAddress(poolManagerAddress);
        });
    }
  }, [selectedToken, selectedFee]);

  const isPoolManagerCreated = (): boolean => {
    if (poolManagers) {
      return !isUndefined(poolManagers[poolManagerAddress]);
    }
    return false;
  };

  const createPool = () => {
    setIsLoading(true);
    if (uniswapPoolsForFeeTier) {
      const uniPool = uniswapPoolsForFeeTier[selectedFee.fee];
      if (selectedToken) {
        const isWethToken0 = uniPool ? uniPool.isWethToken0 : BigNumber.from(WETH_ADDRESS).lt(selectedToken.address);
        // Calculate sqrtPriceX96
        const sqrtPriceX96 = getSqrtPriceX96ForToken(startingPrice, isWethToken0);
        // Calculate liquidity
        // TODO: Improve sqrtPriceX96 calcs
        // we subtract 10 wei to avoid a possible error when uniswap calls transferFrom()
        const liquidity = calculateLiquidity(
          sqrtPriceX96,
          wethAmount.sub(10),
          tokenAmount.sub(10),
          uniPool.isWethToken0
        );
        // Check if poolmanager is already created
        if (isPoolManagerCreated()) {
          // If created call the poolmanager on increaseLiquidity
          poolManagerService.increaseFullRangePosition(poolManagerAddress, liquidity, sqrtPriceX96).then(() => {
            updatePoolState();
            setIsLoading(false);
          });
        } else {
          // If not created call poolmanagerfactory with params
          poolManagerFactoryService
            .createPoolManager(selectedToken.address, selectedToken.symbol, selectedFee.fee, liquidity, sqrtPriceX96)
            .then(() => {
              updatePoolState();
              setIsLoading(false);
            });
        }
      }
    }
  };

  return (
    <Container>
      {!isApproved && (
        <SBoxButton
          onClick={() => {
            handleApprove();
          }}
          disabled={isDisabled}
        >
          {isLoading && <Loading />}
          {!isLoading && <>{!ethIsApproved ? 'Approve WETH' : `Approve ${selectedToken?.symbol}`}</>}
        </SBoxButton>
      )}

      {/* Initialize/Add-Liquidity Pool Logic */}
      {isApproved && (
        <SBoxButton onClick={createPool} disabled={isDisabled}>
          {isLoading && <Loading />}
          {!isLoading && (isPoolManagerCreated() ? 'Add Liquidity' : 'Create Oracle')}
        </SBoxButton>
      )}
    </Container>
  );
};

export default SubmitFormSection;
