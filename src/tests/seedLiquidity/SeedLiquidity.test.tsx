import SeedLiquidity from '~/pages/SeedLiquidity';
import { render, screen } from '~/tests';

describe('Seed Liquidity Page', () => {
  it('Should render Liquidity Page', () => {
    render(<SeedLiquidity />);
    expect(screen.getByText(/create oracle/i)).toBeInTheDocument();
  });
});
