import { useEffect, useState } from 'react';
import { BigNumber, utils, constants } from 'ethers';
import { useProvider } from 'wagmi';

import { AlertsActions, ModalsActions } from '~/store';
import { useContracts, useAppDispatch } from '~/hooks';
import { CreateProps } from '~/containers/modals/CostsModal';
import {
  ColumnContainer,
  Container,
  TableContainer,
  Subtitle,
  Title,
  Text,
  Value,
  SBoxButton,
  TotalContainer,
  GasValue,
  TotalText,
  GasIcon,
} from './CostModal.styles';
import { Loading } from '~/components/shared';
import { formatCost } from '~/utils';
import { getConfig } from '~/config';
import { CARDINALITY, TX_COSTS } from '~/config/constants/misc';

export const Cost = ({ createProps }: { createProps: CreateProps }) => {
  const cardinalityTarget = CARDINALITY;
  const increaseCardinalityCost = TX_COSTS.INCREASE_CARDINALITY;
  const createUniPoolCost = TX_COSTS.CREATE_UNI_POOL;

  const dispatch = useAppDispatch();
  const provider = useProvider();
  const [isLoading, setIsLoading] = useState(true);
  const [gasPrice, setGasPrice] = useState<BigNumber>(utils.parseUnits('20', 'gwei'));
  const [totalCost, setTotalCost] = useState<BigNumber | undefined>(constants.Zero);
  const { poolManagerFactoryService } = useContracts();

  const increaseCardinality = () => {
    const cardinality = createProps?.cardinality;
    let increment = 0;

    if (cardinality && cardinality < cardinalityTarget) {
      increment = cardinalityTarget - cardinality;
    } else if (!cardinality) {
      increment = cardinalityTarget;
    }

    return increaseCardinalityCost * increment;
  };

  const createUniswapPool = () => {
    return createProps.poolExist ? 0 : createUniPoolCost;
  };

  const deployPriceContracts = () => {
    return totalCost ? Number.parseFloat(totalCost.toString()) - createUniswapPool() - increaseCardinality() : 0;
  };

  const gasCosts = {
    // costs in wei
    createUniswapPool: createUniswapPool().toString(),
    increseCardinality: increaseCardinality().toString(),
    deployPriceContracts: deployPriceContracts().toString(),
  };

  const handleClick = () => {
    setIsLoading(true);
    poolManagerFactoryService
      .createPoolManager(
        createProps.tokenAddress,
        createProps.tokenSymbol,
        createProps.fee,
        BigNumber.from(createProps.liquidity),
        BigNumber.from(createProps.sqrtPriceX96)
      )
      .finally(() => {
        setIsLoading(false);
        dispatch(ModalsActions.closeModal());
      });
  };

  useEffect(() => {
    const isDev = getConfig().ALLOW_DEV_MODE;
    if (!isDev) {
      provider.getGasPrice().then((gasPrice) => {
        setGasPrice(gasPrice);
      });
    }

    poolManagerFactoryService
      .estimateGasCreatePoolManager(
        createProps.tokenAddress,
        createProps.fee,
        BigNumber.from(createProps.liquidity),
        BigNumber.from(createProps.sqrtPriceX96)
      )
      .then((txCost) => {
        setTotalCost(txCost);
        setIsLoading(false);
      })
      .catch(() => {
        dispatch(
          AlertsActions.openAlert({
            message: `Failed to estimate the oracle creation cost`,
            type: 'error',
          })
        );
        dispatch(ModalsActions.closeModal());
      });
  }, []);

  return (
    <Container>
      <Title>Oracle Creation Gas Summary</Title>
      <Subtitle>
        Gas calculations are only an estimation. Your wallet will set the exact price of the transaction.
      </Subtitle>

      <TableContainer>
        <ColumnContainer>
          {!createProps.poolExist && <Text>Uniswap v3 Pool Creation</Text>}
          {gasCosts.increseCardinality !== '0' && <Text>Cardinality Increase</Text>}
          <Text>Price Contracts Creation</Text>
        </ColumnContainer>

        <ColumnContainer>
          {!createProps.poolExist && <Value>~ {formatCost(gasCosts.createUniswapPool, 0, 2)} Wei</Value>}
          {gasCosts.increseCardinality !== '0' && <Value>~ {formatCost(gasCosts.increseCardinality, 0, 2)} Wei</Value>}
          <Value>~ {formatCost(gasCosts.deployPriceContracts, 0, 2)} Wei</Value>
        </ColumnContainer>
      </TableContainer>

      <TotalContainer>
        <TotalText>
          <Text>Total </Text>
          <GasValue variant='small'>
            (<GasIcon name='gas' /> at {formatCost(gasPrice.toString(), 9, 0)} Gwei)
          </GasValue>
        </TotalText>
        {totalCost && <Value>~ {formatCost(gasPrice.mul(totalCost).toString(), 18, 2)} ETH</Value>}
      </TotalContainer>

      <SBoxButton onClick={() => handleClick()} disabled={isLoading}>
        {isLoading && <Loading />}
        {!isLoading && 'Create Oracle'}
      </SBoxButton>
    </Container>
  );
};
