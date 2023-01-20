import { vi } from 'vitest';
import { constants } from 'ethers';

import { render, screen, within } from '~/tests';
import { feeTier, token, uniswapPoolForFeeTierMock } from '~/tests/unit/__mocks__';
import SeedLiquidity from '~/pages/SeedLiquidity';
import PropertiesSection from '~/pages/SeedLiquidity/Properties/PropertiesSection';
import DepositAmountsSection from '~/pages/SeedLiquidity/Deposit/DepositAmountsSection';
import SelectTokenSection from '~/pages/SeedLiquidity/SelectToken/SelectTokenSection';

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

describe('Testing <PropertiesSection />', () => {
  const functionMock = vi.fn();

  beforeEach(() => {
    render(
      <PropertiesSection
        selectedToken={token}
        startingPrice={constants.Zero}
        setStartingPrice={functionMock}
        uniswapPoolsForFeeTier={uniswapPoolForFeeTierMock}
        setUniswapPoolsForFeeTier={functionMock}
        selectedFee={feeTier}
        setSelectedFee={functionMock}
        oraclesCreated={{ [feeTier.fee]: false }}
      />
    );
  });

  it('shows the correct "Starting Price" when uniswapPool is passed', () => {
    const startingPriceSection = within(screen.getByTestId('starting-price'));
    expect(startingPriceSection.getByDisplayValue(/1094.873103/)).toBeInTheDocument();
  });

  it('shows the correct "Token Rate" when uniswapPool is passed', () => {
    const tokenRateSection = within(screen.getByTestId('token-rate'));
    expect(tokenRateSection.getByText(token.symbol)).toBeInTheDocument();
    expect(tokenRateSection.getByText(/1094.873103/)).toBeInTheDocument();
  });

  it('shows the "Fee tier" selected', () => {
    const feeTierSection = within(screen.getByTestId('feeTier-selected'));
    expect(feeTierSection.getByText(feeTier.label)).toBeInTheDocument();
    expect(feeTierSection.getByText(feeTier.hint)).toBeInTheDocument();
  });
});

describe('Testing <DepositAmountsSection />', () => {
  beforeEach(() => {
    render(
      <DepositAmountsSection
        selectedToken={token}
        startingPrice={constants.WeiPerEther}
        uniswapPoolsForFeeTier={uniswapPoolForFeeTierMock}
        selectedFee={feeTier}
        poolManagerAddress={''}
      />
    );
  });

  it('both inputs start with null value', () => {
    expect(screen.getByLabelText('token amount')).toHaveValue('');
    expect(screen.getByLabelText('weth amount')).toHaveValue('');
  });

  it('shows the selected token symbol and image', () => {
    expect(screen.getByText(token.symbol)).toBeInTheDocument();
    expect(screen.getByLabelText('token amount').previousSibling).toHaveAttribute('src', token.logoURI);
  });
});

describe('Testing <SelectTokenSection />', () => {
  const functionMock = vi.fn();

  it('shows the selected token symbol and image', () => {
    render(<SelectTokenSection selectedToken={token} setSelectedToken={functionMock} />);
    expect(screen.getByText(token.symbol)).toBeInTheDocument();
    expect(screen.getByText(token.symbol).previousSibling).toHaveAttribute('src', token.logoURI);
  });
});
