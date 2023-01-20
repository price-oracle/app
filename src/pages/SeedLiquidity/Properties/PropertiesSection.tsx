import { useEffect } from 'react';
import { BigNumber, utils } from 'ethers';
import { isUndefined } from 'lodash';

import {
  Container,
  NotCreatedContainer,
  SDropdownModal,
  SInputNumber,
  SPrice,
  Suffix,
} from './PropertiesSection.styles';
import FeeCard from './FeeCard';
import PropertyCard, { LockIcon, FeePropertyCard } from './PropertyCard';
import { Icon, InputNumber, Loading } from '~/components/shared';
import Dropdown from '~/components/shared/Dropdown';
import { getConfig } from '~/config';
import { FeeTier, OraclesCreated, Token, UniswapPool } from '~/types';
import { sqrtPriceX96ToPrice } from '~/utils';
import { useContracts } from '~/hooks';

interface PropertiesSectionProps {
  selectedToken: Token | undefined;
  startingPrice: BigNumber | undefined;
  setStartingPrice: (newPrice: BigNumber | undefined) => void;
  uniswapPoolsForFeeTier: { [feeTier: string]: UniswapPool } | undefined;
  setUniswapPoolsForFeeTier: (pools: { [feeTier: string]: UniswapPool } | undefined) => void;
  selectedFee: FeeTier;
  setSelectedFee: (fee: FeeTier) => void;
  oraclesCreated: OraclesCreated;
}

function PropertiesSection({
  selectedToken,
  startingPrice,
  setStartingPrice,
  uniswapPoolsForFeeTier,
  setUniswapPoolsForFeeTier,
  selectedFee,
  setSelectedFee,
  oraclesCreated,
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
                      {oraclesCreated[fee.fee] || <FeeCard.UsagePercentage>not created</FeeCard.UsagePercentage>}
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
