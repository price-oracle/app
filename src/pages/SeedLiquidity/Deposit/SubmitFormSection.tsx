import { useEffect, useState } from 'react';
import { BigNumber, constants } from 'ethers';
import styled from 'styled-components';
import { useAccount, useNetwork } from 'wagmi';
import { isUndefined } from 'lodash';

import { calculateLiquidity, getSqrtPriceX96ForToken } from '~/utils';
import { BoxButton, Loading, SPACING_12, Typography } from '~/components/shared';
import { getConfig } from '~/config';
import { useAppSelector, useContracts, useUpdateState } from '~/hooks';
import { Address, FeeTier, Token, UniswapPool } from '~/types';
import { Tooltip } from '~/containers/Tooltips';

const Container = styled.section`
  display: grid;
  flex-direction: column;
  justify-content: center;
`;

const MinAmount = styled(Typography).attrs({
  variant: 'small',
  color: 'disabled',
})`
  padding-bottom: ${SPACING_12};
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
  resetInputValues: () => void;
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
  resetInputValues,
}: AmountsProps) => {
  const { updatePoolAndLockState } = useUpdateState();
  const poolManagers = useAppSelector((state) => state.poolManagers.elements);
  const { poolManagerFactoryService, poolManagerService, erc20Service } = useContracts();

  const { address } = useAccount();
  const { chain } = useNetwork();
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
    if (address && selectedToken?.address) {
      setIsLoading(true);
      erc20Service
        .fetchTokenAllowance([WETH_ADDRESS, selectedToken.address], poolManagerAddress, address)
        .then(([wethAllowance, tokenAllowance]) => {
          setWethAllowance(wethAllowance);
          setTokenAllowance(tokenAllowance);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleApprove = () => {
    setIsLoading(true);
    if (!ethIsApproved)
      erc20Service
        .approveTokenAmount(WETH_ADDRESS, poolManagerAddress, wethAmount)
        .then(() => {
          updateAllowanceAmount(poolManagerAddress);
        })
        .catch(() => {
          setIsLoading(false);
        });

    if (ethIsApproved)
      if (selectedToken?.address) {
        erc20Service
          .approveTokenAmount(selectedToken?.address, poolManagerAddress, tokenAmount)
          .then(() => {
            updateAllowanceAmount(poolManagerAddress);
          })
          .catch(() => {
            setIsLoading(false);
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
          setPoolManagerAddress(poolManagerAddress);
        });
    }
  }, [selectedToken, selectedFee]);

  useEffect(() => {
    if (poolManagerAddress) {
      updateAllowanceAmount(poolManagerAddress);
    }
  }, [poolManagerAddress, address, chain]);

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
          poolManagerService
            .increaseFullRangePosition(poolManagerAddress, liquidity, sqrtPriceX96)
            .then(() => {
              updatePoolAndLockState();
              resetInputValues();
            })
            .finally(() => {
              updateAllowanceAmount(poolManagerAddress);
              setIsLoading(false);
            });
        } else {
          // If not created call poolmanagerfactory with params
          poolManagerFactoryService
            .createPoolManager(selectedToken.address, selectedToken.symbol, selectedFee.fee, liquidity, sqrtPriceX96)
            .then(() => {
              updatePoolAndLockState();
              resetInputValues();
            })
            .finally(() => {
              updateAllowanceAmount(poolManagerAddress);
              setIsLoading(false);
            });
        }
      }
    }
  };

  const createOracleMessage = () => {
    if (!address) return 'Wallet must be connected';
    if (wethAmount.gt(wethBalance) || tokenAmount.gt(tokenBalance)) return 'Insufficient balance';
    if (wethAmount.isZero()) return 'Insufficient amount';
    if (!isPoolManagerCreated() && insufficentWeth()) return 'Insufficient WETH amount';
    return '';
  };

  const insufficentWeth = () => {
    // TODO: fetch min WETH amount from contract
    return wethAmount.lt(constants.WeiPerEther.mul(25));
  };

  return (
    <>
      <Container>
        <Tooltip content={createOracleMessage()}>
          {!isApproved && (
            <SBoxButton
              onClick={() => {
                handleApprove();
              }}
              disabled={isDisabled || (!isPoolManagerCreated() && insufficentWeth())}
            >
              {isLoading && <Loading />}
              {!isLoading && <>{!ethIsApproved ? 'Approve WETH' : `Approve ${selectedToken?.symbol}`}</>}
            </SBoxButton>
          )}

          {/* Initialize/Add-Liquidity Pool Logic */}
          {isApproved && (
            <SBoxButton onClick={createPool} disabled={isDisabled || (!isPoolManagerCreated() && insufficentWeth())}>
              {isLoading && <Loading />}
              {!isLoading && (isPoolManagerCreated() ? 'Add Liquidity' : 'Create Oracle')}
            </SBoxButton>
          )}
        </Tooltip>
      </Container>
      <MinAmount>Minimum WETH amount to create a new oracle: 25 WETH</MinAmount>
    </>
  );
};

export default SubmitFormSection;
