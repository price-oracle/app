import SeedLiquidity from '~/pages/SeedLiquidity';
import { render } from '~/tests';

describe('Seed Liquidity Page', () => {
  it('Should render Liquidity Page', () => {
    const { asFragment, getByText } = render(<SeedLiquidity />);

    expect(getByText(/create oracle/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
