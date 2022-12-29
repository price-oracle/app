import { render } from '~/tests';

import Pools from '~/pages/Pools';
import Dashboard from '~/pages/Pools/Dashboard/Dashboard';
import PoolList from '~/pages/Pools/PoolList/PoolList';

describe('Pool Page', () => {
  it('Should render Pools Page', () => {
    const { asFragment, getByText } = render(<Pools />);

    expect(getByText(/dashboard/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Testing Pool page initial state', () => {
  it('"Total ETH locked" and "Calimable rewards" should start loading', () => {
    const dashboard = render(<Dashboard />);
    const loaderIcon = dashboard.getAllByTestId('loader-icon');
    expect(loaderIcon.length).toEqual(2);
  });

  it('"Pools" should start loading', () => {
    const poolList = render(<PoolList />);
    const loaderIcon = poolList.getAllByTestId('loader-icon');
    expect(loaderIcon.length).toEqual(1);
  });
});
