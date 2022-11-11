import styled from 'styled-components';

import Dropdown from '~/components/shared/Dropdown';
import { Typography, Loading, Icon, SPACING_16, SPACING_24 } from '~/components/shared';
import PropertyCard from './PropertyCard';
import FeeCard from './FeeCard';

const Container = styled.section`
  display: grid;
  grid-area: set-starting-price;
  grid-column-gap: ${SPACING_16};
  grid-template-columns: repeat(3, 1fr);
  max-width: 767px;
  margin: 0 auto;
  width: 100%;
`;

const SDropdownModal = styled(Dropdown.Modal)`
  column-gap: ${SPACING_16};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: ${SPACING_24} 0;
  padding: ${SPACING_16};
  row-gap: ${SPACING_16};
  transform: translateX(-45%);
`;

const Suffix = styled(Typography).attrs({
  color: 'disabled',
  variant: 'small',
})`
  margin-left: 2px;
`;

function PropertiesSection() {
  const dropdownProps = Dropdown.useProps();

  // temporary fixed values
  const feeCard = {
    created: false,
    hint: 'testHint',
    feePercentage: 0.3,
  };
  const feeCards = [feeCard, feeCard, feeCard, feeCard];
  const ethRateInput = {
    symbol: 'TUSD',
    logoURI: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png`,
    name: 'TrueUSD',
    value: 1300,
    decimals: 18,
  };
  const isLoading = false;

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
          <Suffix>{ethRateInput?.symbol || ''}</Suffix>
        </PropertyCard.Value>
      </PropertyCard>

      <PropertyCard>
        <PropertyCard.Title>Fee Tier</PropertyCard.Title>

        <PropertyCard.Value>
          {isLoading && <Loading />}

          {!isLoading && (
            <Dropdown {...dropdownProps}>
              <Dropdown.Button>
                {/* {getFeePercentage(selectedFeeCardProps)} */}
                0.3%
              </Dropdown.Button>
              <SDropdownModal>
                {feeCards.map((f) => (
                  <FeeCard onClick={() => console.log('handleClickFeeBuilder(f)')} key={f.feePercentage}>
                    <FeeCard.FeePercentage>
                      {/* {getFeePercentage(f)} */}
                      0.3%
                    </FeeCard.FeePercentage>
                    {f.created || <FeeCard.UsagePercentage>not created</FeeCard.UsagePercentage>}
                    <FeeCard.Hint>{f.hint}</FeeCard.Hint>
                  </FeeCard>
                ))}
              </SDropdownModal>
            </Dropdown>
          )}
        </PropertyCard.Value>

        <PropertyCard.Helper />
        {!isLoading && (
          <PropertyCard.Chip>
            Best for most pairs
            {/* {selectedFeeCardProps?.hint} */}
          </PropertyCard.Chip>
        )}
      </PropertyCard>
    </Container>
  );
}

export default PropertiesSection;
