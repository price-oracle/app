import styled from 'styled-components';

import { THEME_TEXT_PRIMARY } from './theme/theme.selector';

const InputWithoutStyles = styled.input`
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: unset;
`;

const Input = styled(InputWithoutStyles)`
  color: ${THEME_TEXT_PRIMARY};
`;

export default Input;
