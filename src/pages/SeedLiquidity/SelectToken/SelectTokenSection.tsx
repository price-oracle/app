import styled from 'styled-components';

import { EthIcon, FONT_SIZE_24, Icon, SPACING_16, SPACING_8, TokenIcon, Typography } from '~/components/shared';
import Dropdown from '~/components/shared/Dropdown';
import { Token } from '~/types/Token';
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

interface SelectTokenProps {
  selectedToken: Token;
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
            <STokenList onSelect={(token: Token) => onTokenSelect(token)} />
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
