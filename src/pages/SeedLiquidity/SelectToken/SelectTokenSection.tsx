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
import { AlertsActions, useAppDispatch } from '~/store';
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

const SDropdownModal = styled(Dropdown.Modal)`
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin-top: 0;
    margin-left: 2.5rem;
  }
`;

const TokenDropdown = styled(Dropdown.Button)`
  padding-left: 0.7rem;
`;

interface SelectTokenProps {
  selectedToken: Token | undefined;
  setSelectedToken: (token: Token) => void;
}

const SelectTokenSection = ({ selectedToken, setSelectedToken }: SelectTokenProps) => {
  const dropdownProps = Dropdown.useProps();
  const dispatch = useAppDispatch();

  const onTokenSelect = (token: Token) => {
    if (token.symbol === 'WETH') {
      dispatch(AlertsActions.openAlert({ message: 'Invalid Token', type: 'error' }));
    } else {
      setSelectedToken(token);
      dropdownProps.setShow(false);
    }
  };

  return (
    <Container>
      <Typography variant='x-large' weight='semibold'>
        {'Select Token '}
        <Icon name='arrow-down' rotate={270} />
      </Typography>

      <RightSide>
        <Dropdown {...dropdownProps}>
          <TokenDropdown>
            <STokenIcon src={selectedToken?.logoURI || ''} size={FONT_SIZE_24()} />
            <PaddedTypography variant='x-large' weight='semibold'>
              {selectedToken?.symbol}
            </PaddedTypography>
          </TokenDropdown>

          <SDropdownModal>
            <Dropdown.Modal>
              <STokenList onSelect={(token: Token) => onTokenSelect(token)} />
            </Dropdown.Modal>
          </SDropdownModal>
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
