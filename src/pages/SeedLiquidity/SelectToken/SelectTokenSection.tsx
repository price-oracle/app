import styled from 'styled-components';

import {
  EthIcon,
  FONT_SIZE_24,
  Icon,
  SPACING_16,
  SPACING_8,
  TokenIcon,
  Typography,
  MOBILE_MAX_WIDTH,
} from '~/components/shared';
import Dropdown from '~/components/shared/Dropdown';
import { Token } from '~/types/Token';
import TokenList from './TokenList';

const Container = styled.section`
  grid-area: select-token;
  grid-row-gap: ${SPACING_16};
  display: flex;
  justify-content: space-between;
  font-family: ${FONT_SIZE_24};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    flex-direction: column;
    align-items: flex-start;
  }
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

const PaddedTypography = styled(Typography)`
  padding: 0.1rem 0;
`;

interface SelectTokenProps {
  selectedToken: Token | undefined;
  setSelectedToken: (token: Token) => void;
}

const SelectTokenSection = ({ selectedToken, setSelectedToken }: SelectTokenProps) => {
  const dropdownProps = Dropdown.useProps();

  const onTokenSelect = (token: Token) => {
    dropdownProps.setShow(false);
    setSelectedToken(token);
  };

  return (
    <Container>
      <Typography variant='x-large' weight='semibold'>
        {'Select Token '}
        <Icon name='arrow-down' rotate={270} />
      </Typography>

      <RightSide>
        <Dropdown {...dropdownProps}>
          <Dropdown.Button>
            <STokenIcon src={selectedToken?.logoURI || ''} size={FONT_SIZE_24()} />
            <PaddedTypography variant='x-large' weight='semibold'>
              {selectedToken?.symbol}
            </PaddedTypography>
          </Dropdown.Button>

          <Dropdown.Modal>
            <STokenList onSelect={(token: Token) => onTokenSelect(token)} />
          </Dropdown.Modal>
        </Dropdown>

        <Divider variant='x-large'>{'/'}</Divider>

        <Price variant='x-large' weight='semibold'>
          <EthIcon /> WETH
        </Price>
      </RightSide>
    </Container>
  );
};

export default SelectTokenSection;
