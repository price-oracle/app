import { render } from '~/tests';

import SeedLiquidity from '~/pages/SeedLiquidity';

describe('Seed Liquidity Page', () => {
  it('Should render Liquidity Page', () => {
    const { asFragment, getByText } = render(<SeedLiquidity />);

    expect(getByText(/create oracle/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Testing SeedLiquidity page initial state', () => {
  it('"Create Oracle" button should be disabled', () => {
    const seedLiquidity = render(<SeedLiquidity />);
    expect(seedLiquidity.getByText(/create oracle/i)).toBeInTheDocument();
    expect(seedLiquidity.getByText(/create oracle/i)).toBeDisabled();
  });

  it('Starting price, Rate and Fee Tier should start loading', () => {
    const seedLiquidity = render(<SeedLiquidity />);
    const loaderIcon = seedLiquidity.getAllByTestId('loader-icon');
    expect(loaderIcon.length).toEqual(3);
  });
});
