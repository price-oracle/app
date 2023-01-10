import styled from 'styled-components';

import {
  BoxButton,
  FONT_SIZE_16,
  MOBILE_MAX_WIDTH,
  SPACING_16,
  SPACING_8,
  FONT_SIZE_12,
  Typography,
  Icon,
} from '~/components/shared';

export const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
  display: grid;
  padding: ${SPACING_16};
`;

export const Title = styled(Typography).attrs({
  variant: 'large',
  weight: 'semibold',
  allowWrap: true,
})`
  margin: ${SPACING_8} 0;
  margin-bottom: ${SPACING_16};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-size: ${FONT_SIZE_16};
  }
`;

export const Subtitle = styled(Typography).attrs({
  variant: 'small',
  allowWrap: true,
})`
  margin-bottom: ${SPACING_16};
`;

export const SBoxButton = styled(BoxButton)`
  margin-top: 1rem;
  padding: 0.6rem 4rem;
  text-align: center;
  width: 100%;
  height: auto;
`;

export const Text = styled(Typography).attrs({
  weight: 'regular',
  allowWrap: true,
})`
  text-align: left;
  padding: 0.5rem 0;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-size: ${FONT_SIZE_12};
  }
`;

export const Value = styled(Typography).attrs({
  weight: 'regular',
})`
  text-align: right;
  padding: 0.5rem 0;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    font-size: ${FONT_SIZE_12};
  }
`;

export const TableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin: 0.25rem 0;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: flex-start;
  height: 100%;
`;

export const TotalContainer = styled.div`
  margin: 0.5rem 0 0 0;
  padding-top: 1rem;
  border-top: ${(props) => props.theme.borderPrimary};
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  align-items: top;
  height: auto;
`;

export const TotalText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
`;

export const GasValue = styled(Typography)`
  display: inherit;
  flex-direction: row;
  align-items: center;
  height: 100%;
  margin: auto 0.4rem;
`;

export const GasIcon = styled(Icon)`
  padding: 0;
  margin-right: 0.3rem;
`;
