import Pools from '~/pages/Pools';
import { render, screen } from '~/tests';

describe('Pool Page', () => {
  it('Should render Pools Page', () => {
    render(<Pools />);
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  });
});
