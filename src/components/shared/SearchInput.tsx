import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';
import { Input } from './Input';

const Container = styled.div`
  display: flex;
  position: relative;
  width: 100%;
`;

const SearchIcon = styled(Icon)`
  left: 5px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const SInput = styled(Input)`
  border: ${(props) => props.theme.border};
  padding: 5px 30px 5px;
  width: 100%;
`;

interface IProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput = ({ onChange }: IProps) => {
  return (
    <Container>
      <SearchIcon name='search' />
      <SInput onChange={onChange} />
    </Container>
  );
};
