import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Dropdown from '~/components/shared/Dropdown';
import {
  Typography,
  Loading,
  Icon,
  SPACING_16,
  MOBILE_MAX_WIDTH,
  SPACING_12,
  SPACING_8,
  SPACING_768,
} from '~/components/shared';
import PropertyCard from './PropertyCard';
import FeeCard from './FeeCard';
import { FeeTier, Token } from '~/types';
import { getConfig } from '~/config';
import { UniswapService } from '~/services';
import { updateFeeTierList } from '~/utils';

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
  border: ${(props) => props.theme.border};
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

interface DepositAmountsProps {
  selectedToken: Token | undefined;
}

function PropertiesSection({ selectedToken }: DepositAmountsProps) {
  const uniswapService = new UniswapService();
  const dropdownProps = Dropdown.useProps();

  const FEE_TIERS = getConfig().FEE_TIERS;

  const defaultFee = FEE_TIERS['0_3%'];

  const [selectedFee, setSelectedFee] = useState<FeeTier>(defaultFee);
  const [feeTierList, setFeeTierList] = useState<FeeTier[]>([]);

  const ethRateInput = {
    symbol: 'TUSD',
    logoURI: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png`,
    name: 'TrueUSD',
    value: 1300,
    decimals: 18,
  };
  const isLoading = !feeTierList;

  const setNewFee = (fee: FeeTier) => {
    dropdownProps.setShow(false);
    setSelectedFee(fee);
  };

  useEffect(() => {
    if (selectedToken) {
      uniswapService.fetchUniswapPools(selectedToken.address).then((poolListMap) => {
        const newFees = updateFeeTierList(poolListMap);
        setFeeTierList(Object.values(newFees));
      });
    }
  }, [selectedToken]);

  return (
    <Container>
      <PropertyCard>
        <PropertyCard.Title>Set starting price</PropertyCard.Title>
        <PropertyCard.Value>{ethRateInput.value}</PropertyCard.Value>
        <PropertyCard.Helper />
      </PropertyCard>

      <PropertyCard>
        <PropertyCard.Title>Rate</PropertyCard.Title>
        <PropertyCard.Value>
          1 <Suffix>ETH</Suffix> <Icon name='arrow-down' /* color={disabled} */ rotate={270} /> {ethRateInput.value}
          <Suffix>{selectedToken?.symbol || ''}</Suffix>
        </PropertyCard.Value>
      </PropertyCard>

      <PropertyCard>
        <PropertyCard.Title>Fee Tier</PropertyCard.Title>

        <PropertyCard.Value>
          {isLoading && <Loading />}

          {!isLoading && (
            <Dropdown {...dropdownProps}>
              <Dropdown.Button>{selectedFee.label}</Dropdown.Button>
              <SDropdownModal>
                {feeTierList.map((fee) => (
                  <FeeCard onClick={() => setNewFee(fee)} key={fee.fee}>
                    <FeeCard.FeePercentage>{fee.label}</FeeCard.FeePercentage>
                    {fee.created || <FeeCard.UsagePercentage>not created</FeeCard.UsagePercentage>}
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
