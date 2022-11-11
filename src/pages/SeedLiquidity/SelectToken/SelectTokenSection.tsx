import styled from 'styled-components';

import Dropdown from '~/components/shared/Dropdown';
import { Icon, TokenIcon, EthIcon, Typography, FONT_SIZE_24, SPACING_16, SPACING_8 } from '~/components/shared';
import TokenList from './TokenList';

const Container = styled.section`
  grid-area: select-token;
  grid-row-gap: ${SPACING_16};
  display: flex;
  justify-content: space-between;
  font-family: ${FONT_SIZE_24};
`;

const Price = styled(Typography)`
  display: flex;
  align-items: center;
  column-gap: 0.5rem;
  margin-left: 0.5rem;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = styled(Typography)`
  margin: 0 ${SPACING_8};
`;

const STokenIcon = styled(TokenIcon)`
  margin-right: ${SPACING_8};
`;

const STokenList = styled(TokenList)`
  max-height: 36rem;
`;

const SelectTokenSection = () => {
  const dropdownProps = Dropdown.useProps();

  // temporary fixed values
  const selectedToken = {
    symbol: 'TUSD',
    logoURI: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png`,
    name: 'TrueUSD',
  };

  return (
    <Container>
      <Typography variant='x-large'>
        {'Select Token '}
        <Icon name='arrow-down' rotate={270} />
      </Typography>

      <RightSide>
        <Dropdown {...dropdownProps}>
          <Dropdown.Button>
            <STokenIcon src={selectedToken?.logoURI || ''} size={FONT_SIZE_24()} />
            <Typography variant='x-large'>{selectedToken?.symbol}</Typography>
          </Dropdown.Button>

          <Dropdown.Modal>
            <STokenList onClick={() => console.log('closeModal')} />
          </Dropdown.Modal>
        </Dropdown>

        <Divider variant='x-large'>{'/'}</Divider>

        <Price variant='x-large'>
          <EthIcon /> WETH
        </Price>
      </RightSide>
    </Container>
  );
};

export default SelectTokenSection;
