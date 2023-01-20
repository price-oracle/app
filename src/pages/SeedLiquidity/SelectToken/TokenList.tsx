import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import { useNetwork } from 'wagmi';

import {
  Button,
  Card,
  Loading,
  MOBILE_MAX_WIDTH,
  SearchInput,
  SPACING_8,
  TokenIcon,
  Typography,
} from '~/components/shared';
import { useAppDispatch, useAppSelector, useContracts } from '~/hooks';
import { CustomTokenActions } from '~/store';
import { Token } from '~/types/Token';
import { getTokenList } from '~/utils/tokenList';
import { getConstants } from '~/config/constants';

const SCard = styled(Card)`
  width: 20rem;
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    margin: 0 0 0 1.8rem;
  }
`;

const TokenItem = styled(Button)`
  display: grid;
  grid-template-areas:
    'icon symbol'
    'icon name';
  align-items: center;
  justify-content: left;
  text-align: left;
  grid-column-gap: ${SPACING_8};
  padding: ${SPACING_8};
  width: 100%;
`;

const Icon = styled(TokenIcon)`
  grid-area: icon;
`;

const Symbol = styled(Typography)`
  grid-area: symbol;
`;

const Name = styled(Typography).attrs({
  variant: 'small',
  color: 'secondary',
})`
  text-overflow: ellipsis;
  overflow: hidden;
  grid-area: name;
`;

const TokenListContainer = styled.section`
  max-height: 16rem;
  overflow-y: scroll;
  overflow-x: hidden; /* Hide scrollbars */
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  padding: 0.5rem;
`;

interface IProps {
  onSelect: (token: Token) => void;
  className?: string;
}
const TokenList = ({ onSelect, className }: IProps) => {
  const customTokens = useAppSelector((state) => state.customTokens.tokens);
  const dispatch = useAppDispatch();
  const [tokenList, setTokenList] = useState<Token[] | undefined>();
  const { erc20Service } = useContracts();
  const { chain } = useNetwork();
  const isLoading = false;
  const ref = useRef<HTMLInputElement>(null);

  const [searchInput, setSearchInput] = useState('');

  const [tempCustomToken, setTempCustomToken] = useState<Token>();

  const filterTokens = (tokens: Token[]): Token[] => {
    const filteredTokens = tokens.filter((token) => {
      const searchCriteria = [token.address, token.name, token.symbol].join('-').toLowerCase();
      return searchCriteria.includes(searchInput.toLowerCase());
    });

    if (filteredTokens.length === 0 && ethers.utils.isAddress(searchInput)) {
      erc20Service.fetchTokenData(searchInput).then((token) => setTempCustomToken(token));
    }

    return filteredTokens;
  };

  const allTokens = () => {
    const tokens = getTokenList(chain?.id || getConstants().DEFAULT_CHAIN_ID).concat(customTokens);
    if (tempCustomToken) tokens.push(tempCustomToken);
    return tokens;
  };

  const onSelectToken = (token: Token) => {
    if (token.address.toLowerCase() == tempCustomToken?.address.toLowerCase()) {
      dispatch(CustomTokenActions.addCustomToken({ token: tempCustomToken }));
    }
    onSelect(token);
  };

  useLayoutEffect(() => {
    ref.current?.focus();
  });

  useEffect(() => {
    const list = filterTokens(allTokens());
    setTokenList(list);
  }, [chain]);

  return (
    <SCard>
      <SearchInput onChange={(e) => setSearchInput(e.target.value)} inputRef={ref} />

      <TokenListContainer className={className}>
        {isLoading && <Loading />}
        {!isLoading &&
          tokenList?.map((token) => (
            <TokenItem key={token.symbol} onClick={() => onSelectToken(token)}>
              <Icon src={token.logoURI} />
              <Symbol weight='semibold'>{token.symbol}</Symbol>
              <Name>{token.name}</Name>
            </TokenItem>
          ))}
      </TokenListContainer>
    </SCard>
  );
};

export default TokenList;
