import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';
import { Input } from './Input';
import { FONT_SIZE_16 } from './Variables';

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
  margin-right: 4rem;
`;

const SInput = styled(Input)`
  border-bottom: ${(props) => props.theme.border};
  padding: 1rem 3.8rem 1rem;
  width: 100%;
  font-size: ${FONT_SIZE_16};
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
