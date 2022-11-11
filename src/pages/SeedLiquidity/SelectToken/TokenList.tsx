import styled from 'styled-components';

import { Button, Card, Loading, TokenIcon, SearchInput, Typography, SPACING_8 } from '~/components/shared';

const SCard = styled(Card)`
  width: 15rem;
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
  grid-area: name;
`;

const TokenListContainer = styled.section`
  max-height: 16rem;
  overflow-y: scroll;
`;

interface IProps {
  onClick: () => void;
  className?: string;
}
const TokenList = ({ onClick, className }: IProps) => {
  // temporary fixed values
  const tokens = [
    {
      symbol: 'TUSD',
      logoURI: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0000000000085d4780B73119b644AE5ecd22b376/logo.png`,
      name: 'TrueUSD',
    },
    {
      symbol: 'DAI',
      logoURI: `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png`,
      name: 'Dai',
    },
  ];
  const isLoading = false;

  return (
    <SCard>
      <SearchInput onChange={(e) => console.log(e.target.value)} />

      <TokenListContainer className={className}>
        {isLoading && <Loading />}
        {!isLoading &&
          tokens.map((token) => (
            <TokenItem key={token.symbol} onClick={() => console.log('handleClickSelectToken(token)')}>
              <Icon src={token.logoURI} />
              <Symbol>{token.symbol}</Symbol>
              <Name>{token.name}</Name>
            </TokenItem>
          ))}
      </TokenListContainer>
    </SCard>
  );
};

export default TokenList;
