import { useEffect, useState } from 'react';
import { BigNumber, constants } from 'ethers';
import styled from 'styled-components';
import { useAccount, useNetwork } from 'wagmi';
import { isUndefined } from 'lodash';

import { calculateLiquidity, formatCost, getSqrtPriceX96ForToken } from '~/utils';
import { BoxButton, Loading, SPACING_12, Typography } from '~/components/shared';
import { getConfig } from '~/config';
import { useAppDispatch, useAppSelector, useContracts, useUpdateState } from '~/hooks';
import { Address, FeeTier, Token, UniswapPool } from '~/types';
import { Tooltip } from '~/containers/Tooltips';
import { AlertsActions, ModalsActions } from '~/store';

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
  startingPrice: BigNumber | undefined;
  uniswapPoolsForFeeTier: { [feeTier: string]: UniswapPool } | undefined;
  selectedFee: FeeTier;
  resetInputValues: () => void;
  updateBalances: () => void;
  poolManagerAddress: Address;
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
  updateBalances,
  poolManagerAddress,
}: AmountsProps) => {
  const { updatePoolAndLockState } = useUpdateState();
  const poolManagers = useAppSelector((state) => state.poolManagers.elements);
  const isModalOpen = useAppSelector((state) => state.modals.activeModal);
  const { poolManagerService, erc20Service, poolManagerFactoryService } = useContracts();
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [isInvalid, setIsInvalid] = useState(false);
  const [isOracleCreated, setIsOracleCreated] = useState(false);
  const [wethAllowance, setWethAllowance] = useState<BigNumber>(constants.Zero);
  const [tokenAllowance, setTokenAllowance] = useState<BigNumber>(constants.Zero);
  const [minWeth, setMinEth] = useState<BigNumber | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    ADDRESSES: { WETH_ADDRESS },
  } = getConfig();

  const ethIsApproved = wethAmount.lte(wethAllowance);
  const isApproved = ethIsApproved && tokenAmount.lte(tokenAllowance);

  const isDisabled =
    isLoading || isInvalid || !address || tokenAmount.isZero() || wethAmount.isZero() || !startingPrice;

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
        // we add 1000 wei to avoid a possible error when uniswap calls transferFrom()
        .approveTokenAmount(WETH_ADDRESS, poolManagerAddress, wethAmount.add(1000))
        .then(() => {
          updateAllowanceAmount(poolManagerAddress);
        })
        .catch(() => {
          setIsLoading(false);
        });

    if (ethIsApproved)
      if (selectedToken?.address) {
        erc20Service
          // we add 1000 wei to avoid a possible error when uniswap calls transferFrom()
          .approveTokenAmount(selectedToken?.address, poolManagerAddress, tokenAmount.add(1000))
          .then(() => {
            updateAllowanceAmount(poolManagerAddress);
          })
          .catch(() => {
            setIsLoading(false);
          });
      }
  };

  const createPool = () => {
    setIsLoading(true);
    if (uniswapPoolsForFeeTier && startingPrice) {
      const uniPool = uniswapPoolsForFeeTier[selectedFee.fee];
      if (selectedToken) {
        const isWethToken0 = uniPool ? uniPool.isWethToken0 : BigNumber.from(WETH_ADDRESS).lt(selectedToken.address);
        // Calculate sqrtPriceX96
        const sqrtPriceX96 = getSqrtPriceX96ForToken(startingPrice, isWethToken0);
        // Calculate liquidity
        // TODO: Improve sqrtPriceX96 calcs
        const liquidity = calculateLiquidity(sqrtPriceX96, wethAmount, tokenAmount, isWethToken0);
        // Check if poolmanager is already created
        if (isOracleCreated) {
          // If created call the poolmanager on increaseLiquidity
          poolManagerService
            .increaseFullRangePosition(poolManagerAddress, liquidity, sqrtPriceX96)
            .then(() => {
              updatePoolAndLockState();
              resetInputValues();
            })
            .finally(() => {
              updateAllowanceAmount(poolManagerAddress);
              updateBalances();
              setIsLoading(false);
            });
        } else {
          poolManagerFactoryService
            .estimateGasCreatePoolManager(selectedToken.address, selectedFee.fee, liquidity, sqrtPriceX96)
            .then((gasCost) => {
              // If not created call poolmanagerfactory with params
              const createProps = {
                cardinality: uniswapPoolsForFeeTier[selectedFee.fee]?.cardinality,
                tokenAddress: selectedToken.address,
                tokenSymbol: selectedToken.symbol,
                fee: selectedFee.fee,
                liquidity: liquidity.toString(),
                sqrtPriceX96: sqrtPriceX96.toString(),
                poolExist: !!uniPool,
                gasCost: gasCost?.toString(),
              };

              dispatch(ModalsActions.openModal({ modalName: 'costs', modalProps: createProps }));
            })
            .catch(() => {
              dispatch(
                AlertsActions.openAlert({
                  message: `Failed to estimate the oracle creation cost`,
                  type: 'error',
                })
              );
            });
        }
      }
    }
  };

  useEffect(() => {
    setIsInvalid(tokenAmount.gt(tokenBalance) || wethAmount.gt(wethBalance));
  }, [tokenAmount, wethAmount, tokenBalance, wethBalance]);

  useEffect(() => {
    if (poolManagerAddress) {
      updateAllowanceAmount(poolManagerAddress);
    }
    poolManagerFactoryService.getMinEthAmount().then((newMinEth) => {
      setMinEth(newMinEth);
    });
  }, [poolManagerAddress, address, chain]);

  useEffect(() => {
    if (poolManagers) {
      setIsOracleCreated(!isUndefined(poolManagers[poolManagerAddress]));
    } else {
      setIsOracleCreated(false);
    }
  }, [poolManagers, selectedToken, poolManagerAddress]);

  useEffect(() => {
    if (isModalOpen) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      resetInputValues();
      updatePoolAndLockState();
      updateBalances();
      updateAllowanceAmount(poolManagerAddress);
    }
  }, [isModalOpen]);

  const createOracleMessage = () => {
    if (!address) return 'Wallet must be connected';
    if (!startingPrice) return 'Invalid starting price';
    if (wethAmount.gt(wethBalance) || tokenAmount.gt(tokenBalance)) return 'Insufficient balance';
    if (wethAmount.isZero()) return 'Insufficient deposit amounts';
    if (!isOracleCreated && insufficentWeth()) return 'Insufficient WETH amount';
    return '';
  };

  const insufficentWeth = () => {
    if (minWeth) return wethAmount.lt(minWeth);
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
              disabled={isDisabled || (!isOracleCreated && insufficentWeth())}
            >
              {isLoading && <Loading />}
              {!isLoading && <>{!ethIsApproved ? 'Approve WETH' : `Approve ${selectedToken?.symbol}`}</>}
            </SBoxButton>
          )}

          {/* Initialize/Add-Liquidity Pool Logic */}
          {isApproved && (
            <SBoxButton onClick={createPool} disabled={isDisabled || (!isOracleCreated && insufficentWeth())}>
              {isLoading && <Loading />}
              {!isLoading && (isOracleCreated ? 'Add Liquidity' : 'Create Oracle')}
            </SBoxButton>
          )}
        </Tooltip>
      </Container>
      <MinAmount>
        Minimum WETH amount to create a new oracle: {minWeth ? formatCost(minWeth.toString(), 18, 0) : '-'} WETH
      </MinAmount>
    </>
  );
};

export default SubmitFormSection;
