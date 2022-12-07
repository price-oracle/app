import { createAsyncThunk } from '@reduxjs/toolkit';

import { UniswapService } from '~/services';
import { getEthPriceInUSDC } from '~/utils';
import { ThunkAPI } from '~/store';

const getEthPrice = createAsyncThunk<{ usdPerEth: string }, { uniswapService: UniswapService }, ThunkAPI>(
  'ethPrice/fetch',
  async ({ uniswapService }) => {
    const usdPerEth = await getEthPriceInUSDC(uniswapService);
    return { usdPerEth: usdPerEth.toString() };
  }
);

export const PricesActions = {
  getEthPrice,
};
