import styled from 'styled-components';

import {
  Card,
  Typography,
  SPACING_8,
  SPACING_16,
  SPACING_32,
  SPACING_40,
  SPACING_192,
  SPACING_156,
  SPACING_256,
  SPACING_1050,
} from '~/components/shared';

export const SCard = styled(Card)`
  margin: ${SPACING_32} auto;
  overflow-x: auto;
  max-width: ${SPACING_1050};
  justify-items: left;
`;

export const Title = styled(Typography).attrs({
  color: 'primary',
})``;

export const Table = styled.div`
  display: grid;
  grid-row-gap: ${SPACING_8};
`;

export const Row = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${() =>
    [SPACING_40(), SPACING_192(), SPACING_156(), SPACING_192(), SPACING_256(), SPACING_156()].join(' ')};
  justify-content: right;
  align-items: center;
  margin: 0 auto;
  justify-items: left;
`;

export const Header = styled(Row)`
  margin: ${SPACING_16} auto;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;

  & button {
    margin-left: 1.2rem;
  }
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
