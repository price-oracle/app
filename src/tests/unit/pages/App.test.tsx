import App from '~/App';
import { render } from '~/tests';

describe('Landing Page', () => {
  it('Should render Landing Page', () => {
    const { asFragment, getByText } = render(<App />);

    expect(getByText(/price oracle/i)).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
