import styled from 'styled-components';
import { Card } from '~/components/shared';
import { Typography } from '~/components/shared';
import { SPACING_8, SPACING_16, SPACING_32, SPACING_192, SPACING_128, SPACING_256 } from '~/components/shared';

export const SCard = styled(Card)`
  margin-top: ${SPACING_32};
  overflow-x: auto;
  max-width: 1280px;
  margin: 30px auto;
  justify-items: left;
`;

export const Title = styled(Typography).attrs({
  color: 'secondary',
})``;

export const Table = styled.div`
  display: grid;
  grid-row-gap: ${SPACING_8};
`;

export const Row = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${() =>
    [SPACING_32(), SPACING_192(), SPACING_128(), SPACING_128(), SPACING_192(), SPACING_256(), SPACING_128()].join(' ')};
  justify-content: right;
  align-items: center;
  margin: 0 auto;
  justify-items: left;
`;

export const Header = styled(Row)`
  margin: ${SPACING_16} auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;
`;

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const PriceAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Divider = styled.div`
  padding-left: ${SPACING_8};
  padding-right: ${SPACING_8};
`;
