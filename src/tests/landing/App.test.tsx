import App from '~/App';
import { Input } from '~/components/shared/Input';
import { render, screen } from '~/tests';

describe('Landing Page', () => {
  it('Should render Landing Page', () => {
    render(<App />);
    expect(screen.getByText(/price/i)).toBeInTheDocument();
  });
});

describe('Simple working test', () => {
  it('should render an isolated component', () => {
    render(<Input />);
  });
});
