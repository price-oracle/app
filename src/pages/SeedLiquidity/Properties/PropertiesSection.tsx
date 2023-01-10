import { useEffect } from 'react';
import { BigNumber, utils } from 'ethers';
import { isUndefined } from 'lodash';
import styled from 'styled-components';

import {
  FONT_SIZE_20,
  Icon,
  InputNumber,
  Loading,
  MOBILE_MAX_WIDTH,
  SPACING_12,
  SPACING_16,
  SPACING_28,
  SPACING_768,
  Typography,
} from '~/components/shared';
import Dropdown from '~/components/shared/Dropdown';
import { getConfig } from '~/config';
import { FeeTier, Token, UniswapPool } from '~/types';
import { sqrtPriceX96ToPrice } from '~/utils';
import FeeCard from './FeeCard';
import PropertyCard, { LockIcon, FeePropertyCard } from './PropertyCard';
import { useContracts } from '~/hooks';

const Container = styled.section`
  display: grid;
  grid-area: set-starting-price;
  grid-column-gap: ${SPACING_16};
  grid-template-columns: repeat(3, 1fr);
  max-width: ${SPACING_768};
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SDropdownModal = styled(Dropdown.Modal)`
  column-gap: ${SPACING_16};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: ${SPACING_12} 0;
  padding: ${SPACING_16};
  row-gap: ${SPACING_16};
  transform: translateX(-45%);
  border: ${(props) => props.theme.borderPrimary};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: flex;
    flex-direction: column;
    margin-left: 26vw;
    gap: 1rem;
    padding: 1.2rem;
    width: 35rem;
    align-items: center;
  }
`;

const Suffix = styled(Typography).attrs({
  color: 'disabled',
  variant: 'small',
})`
  margin-left: 2px;
`;

const SInputNumber = styled(InputNumber).attrs({
  placeholder: '0',
})`
  width: 100%;
  font-family: PlusJakartaSans;
  font-size: ${FONT_SIZE_20};
  grid-area: value;
  line-height: 1.25;
  height: ${SPACING_28};

  &:disabled {
    color: ${(props) => props.theme.textDisabled};
  }
`;

const SPrice = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 15rem;
`;

const NotCreatedContainer = styled.div`
  & div {
    background-color: ${(props) => props.theme.textPrimary};
    color: ${(props) => props.theme.background};
  }
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    position: relative;
    top: -4.1rem;
    right: -11.3rem;
    height: 0;
  }
`;

interface PropertiesSectionProps {
  selectedToken: Token | undefined;
  startingPrice: BigNumber | undefined;
  setStartingPrice: (newPrice: BigNumber | undefined) => void;
  uniswapPoolsForFeeTier: { [feeTier: string]: UniswapPool } | undefined;
  setUniswapPoolsForFeeTier: (pools: { [feeTier: string]: UniswapPool } | undefined) => void;
  selectedFee: FeeTier;
  setSelectedFee: (fee: FeeTier) => void;
}

function PropertiesSection({
  selectedToken,
  startingPrice,
  setStartingPrice,
  uniswapPoolsForFeeTier,
  setUniswapPoolsForFeeTier,
  selectedFee,
  setSelectedFee,
}: PropertiesSectionProps) {
  const { uniswapService } = useContracts();

  const dropdownProps = Dropdown.useProps();

  const FEE_TIERS = getConfig().FEE_TIERS;
  const feeTierList = Object.values(FEE_TIERS);

  const isLoading = !uniswapPoolsForFeeTier;

  const setNewFee = (fee: FeeTier) => {
    dropdownProps.setShow(false);
    setSelectedFee(fee);
  };

  const onPriceChange = (newPrice: string | undefined) => {
    if (newPrice) {
      setStartingPrice(utils.parseUnits(newPrice, selectedToken?.decimals));
    } else {
      setStartingPrice(undefined);
    }
  };

  const startingPriceInput = InputNumber.useProps({ initialValue: startingPrice?.toString(), onChange: onPriceChange });

  useEffect(() => {
    if (selectedToken) {
      setUniswapPoolsForFeeTier(undefined);
      startingPriceInput.reset();
      uniswapService
        .fetchUniswapPools(selectedToken.address)
        .then((poolListMap) => setUniswapPoolsForFeeTier(poolListMap));
    }
  }, [selectedToken]);

  useEffect(() => {
    const newPrice = getPriceOfSelectedToken();
    if (newPrice) {
      startingPriceInput.set(newPrice);
      onPriceChange(newPrice);
    } else {
      startingPriceInput.set('');
      onPriceChange(undefined);
    }
  }, [selectedFee, uniswapPoolsForFeeTier]);

  const isPoolCreated = (fee: number) => uniswapPoolsForFeeTier && !isUndefined(uniswapPoolsForFeeTier[fee]);
  const selectedFeeTierExists = isPoolCreated(selectedFee.fee);

  const getPriceOfSelectedToken = () => {
    if (uniswapPoolsForFeeTier && selectedToken) {
      const uniPool = uniswapPoolsForFeeTier[selectedFee.fee];
      if (uniPool) {
        const priceInWei = sqrtPriceX96ToPrice(uniPool.pricing, uniPool.isWethToken0);
        return utils.formatUnits(priceInWei, selectedToken.decimals);
      }
    }
  };

  return (
    <Container>
      <PropertyCard data-testid='starting-price'>
        <PropertyCard.Title>Starting price</PropertyCard.Title>

        <PropertyCard.Value>
          {isLoading && <Loading />}
          {!isLoading && (
            <SInputNumber {...startingPriceInput} disabled={selectedFeeTierExists} aria-label='starting price' />
          )}
        </PropertyCard.Value>
        {selectedFeeTierExists && <LockIcon name='lock' />}
      </PropertyCard>

      <PropertyCard data-testid='token-rate'>
        <PropertyCard.Title>Rate</PropertyCard.Title>
        <PropertyCard.Value>
          1 <Suffix> ETH</Suffix>
          <Icon name='arrow-down' /* color={disabled} */ rotate={270} />
          {isLoading && <Loading />}
          {!isLoading && <SPrice>{startingPriceInput.value}</SPrice>}
          <Suffix>{selectedToken?.symbol || ''}</Suffix>
        </PropertyCard.Value>
      </PropertyCard>

      <FeePropertyCard data-testid='feeTier-selected'>
        <PropertyCard.Title>Fee Tier</PropertyCard.Title>

        <PropertyCard.Value>
          {isLoading && <Loading />}
          {!isLoading && (
            <Dropdown {...dropdownProps}>
              <Dropdown.Button>{selectedFee?.label}</Dropdown.Button>
              <SDropdownModal>
                {feeTierList.map((fee) => (
                  <FeeCard onClick={() => setNewFee(fee)} key={fee.fee}>
                    <FeeCard.FeePercentage>{fee.label}</FeeCard.FeePercentage>
                    <NotCreatedContainer>
                      {isPoolCreated(fee.fee) || <FeeCard.UsagePercentage>not created</FeeCard.UsagePercentage>}
                    </NotCreatedContainer>
                    <FeeCard.Hint>{fee.hint}</FeeCard.Hint>
                  </FeeCard>
                ))}
              </SDropdownModal>
            </Dropdown>
          )}
        </PropertyCard.Value>
        {!isLoading && <PropertyCard.Chip>{selectedFee.hint}</PropertyCard.Chip>}
      </FeePropertyCard>
    </Container>
  );
}

export default PropertiesSection;
