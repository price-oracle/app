import styled from 'styled-components';

const InputWithoutStyles = styled.input`
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: unset;
`;

const Input = styled(InputWithoutStyles)`
  color: ${(props) => props.theme.textPrimary};
`;

export default Input;
