import Pools from '~/pages/Pools';
import { render } from '~/tests';

describe('Pool Page', () => {
  it('Should render Pools Page', () => {
    const { asFragment, getByText } = render(<Pools />);

    expect(getByText(/dashboard/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
