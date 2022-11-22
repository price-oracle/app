import Dashboard from './Dashboard/Dashboard';
import PoolList from './PoolList/PoolList';
import styled from 'styled-components';
import { SPACING_24 } from '~/components/shared';

export const Container = styled.div`
  background: ${(props) => props.theme.background};
  padding: 0rem 0.8rem ${SPACING_24};
`;

function Pools() {
  return (
    <Container>
      <Dashboard />
      <PoolList />
    </Container>
  );
}

export default Pools;
