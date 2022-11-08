import styled from 'styled-components';

import InputNumber from '~/components/shared/InputNumber';
import { BoxButton } from '~/components/shared';
import { SPACING_32, SPACING_16, SPACING_8 } from '~/components/shared/Variables';

export const InputContainer = styled.div`
  display: flex;
`;

export const Container = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textPrimary};
  display: grid;
`;

export const Title = styled.h2`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: ${SPACING_32} 0;
`;

export const SBoxButton = styled(BoxButton)`
  margin: 10px 0;
  padding: 6px 40px;
  text-align: center;
  width: 100%;
`;

export const SInputNumber = styled(InputNumber)`
  border: ${(props) => props.theme.border};
  padding: ${SPACING_8};
  width: 100%;
`;

export const Label = styled.label`
  align-items: center;
  display: grid;
  grid-column-gap: ${SPACING_8};
  grid-template-columns: repeat(3, auto);
  margin-bottom: ${SPACING_16};
  width: fit-content;
`;

export const Text = styled.div`
  margin-left: 1rem;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  margin: 10px 0;
`;
