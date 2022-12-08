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
  SPACING_768,
  SPACING_8,
  Typography,
} from '~/components/shared';
import Dropdown from '~/components/shared/Dropdown';
import { getConfig } from '~/config';
import { UniswapService } from '~/services';
import { FeeTier, Token, UniswapPool } from '~/types';
import { sqrtPriceX96ToPrice } from '~/utils';
import FeeCard from './FeeCard';
import PropertyCard from './PropertyCard';

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
  min-width: 38rem;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-left: 10.5rem;
    row-gap: ${SPACING_8};
    column-gap: ${SPACING_8};
    padding: ${SPACING_8};
  }
`;

const Suffix = styled(Typography).attrs({
  color: 'disabled',
  variant: 'small',
})`
  margin-left: 2px;
`;

const SInputNumber = styled(InputNumber)`
  width: 100%;
  font-family: PlusJakartaSans;
  font-size: ${FONT_SIZE_20};
  grid-area: value;
  line-height: 1.25;
`;

const SPrice = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 15rem;
`;

interface PropertiesSectionProps {
  selectedToken: Token | undefined;
  startingPrice: BigNumber;
  setStartingPrice: (newPrice: BigNumber) => void;
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
  const uniswapService = new UniswapService();

  const dropdownProps = Dropdown.useProps();

  const FEE_TIERS = getConfig().FEE_TIERS;
  const feeTierList = Object.values(FEE_TIERS);

  const isLoading = !uniswapPoolsForFeeTier;

  const setNewFee = (fee: FeeTier) => {
    dropdownProps.setShow(false);
    setSelectedFee(fee);
  };

  const onPriceChange = (newPrice: string) => {
    setStartingPrice(utils.parseUnits(newPrice, selectedToken?.decimals));
  };

  const startingPriceInput = InputNumber.useProps({ initialValue: startingPrice.toString(), onChange: onPriceChange });

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
      <PropertyCard>
        <PropertyCard.Title>Set starting price</PropertyCard.Title>
        <PropertyCard.Value>
          {isLoading && <Loading />}
          {!isLoading && <SInputNumber {...startingPriceInput} disabled={selectedFeeTierExists} />}
        </PropertyCard.Value>
        <PropertyCard.Helper />
      </PropertyCard>

      <PropertyCard>
        <PropertyCard.Title>Rate</PropertyCard.Title>
        <PropertyCard.Value>
          1 <Suffix> ETH</Suffix>
          <Icon name='arrow-down' /* color={disabled} */ rotate={270} />
          {isLoading && <Loading />}
          {!isLoading && <SPrice>{startingPriceInput.value}</SPrice>}
          <Suffix>{selectedToken?.symbol || ''}</Suffix>
        </PropertyCard.Value>
      </PropertyCard>

      <PropertyCard>
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
                    {isPoolCreated(fee.fee) || <FeeCard.UsagePercentage>not created</FeeCard.UsagePercentage>}
                    <FeeCard.Hint>{fee.hint}</FeeCard.Hint>
                  </FeeCard>
                ))}
              </SDropdownModal>
            </Dropdown>
          )}
        </PropertyCard.Value>

        <PropertyCard.Helper />
        {!isLoading && <PropertyCard.Chip>{selectedFee.hint}</PropertyCard.Chip>}
      </PropertyCard>
    </Container>
  );
}

export default PropertiesSection;
