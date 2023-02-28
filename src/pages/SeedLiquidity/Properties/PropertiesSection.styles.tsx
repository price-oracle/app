import styled from 'styled-components';

import {
  FONT_SIZE_20,
  InputNumber,
  MOBILE_MAX_WIDTH,
  SPACING_12,
  SPACING_16,
  SPACING_28,
  SPACING_768,
  Typography,
} from '~/components/shared';
import Dropdown from '~/components/shared/Dropdown';

export const Container = styled.section`
  display: grid;
  grid-area: set-starting-price;
  grid-column-gap: ${SPACING_16};
  grid-template-columns: repeat(3, 1fr);
  max-width: ${SPACING_768};
  margin: 0 auto;
  width: 100%;

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const SDropdownModal = styled(Dropdown.Modal)`
  column-gap: ${SPACING_16};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: ${SPACING_12} 0;
  padding: ${SPACING_16};
  row-gap: ${SPACING_16};
  transform: translateX(-45%);
  border: ${(props) => props.theme.borderPrimary};

  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    display: flex;
    flex-direction: column;
    margin-left: 26vw;
    gap: 1rem;
    padding: 1.2rem;
    width: 35rem;
    align-items: center;
  }
`;

export const Suffix = styled(Typography).attrs({
  color: 'disabled',
  variant: 'small',
})`
  margin-left: 2px;
`;

export const SInputNumber = styled(InputNumber).attrs({
  placeholder: '0',
})`
  width: 100%;
  font-family: PlusJakartaSans;
  font-size: ${FONT_SIZE_20};
  grid-area: value;
  line-height: 1.25;
  height: ${SPACING_28};

  &:disabled {
    color: ${(props) => props.theme.textDisabled};
    opacity: unset;
  }
`;

export const SPrice = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 15rem;
`;

export const NotCreatedContainer = styled.div`
  & div {
    background-color: ${(props) => props.theme.textPrimary};
    color: ${(props) => props.theme.background};
  }
  @media (max-width: ${MOBILE_MAX_WIDTH}px) {
    position: relative;
    top: -4.1rem;
    right: -11.3rem;
    height: 0;
  }
`;
