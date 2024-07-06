import { 
  createAsyncThunk, 
  createSlice, 
  PayloadAction 
} from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';
import { 
  FetchMarketsParams, 
  Market, 
  MarketsState 
} from '../../../types';

const initialState: MarketsState = {
  data: [],
  loading: false,
  error: false,
};

export const fetchMarkets = createAsyncThunk<
  Market[],
  FetchMarketsParams,
  { state: RootState }
>(
  'data/fetchMarkets',
  async ({ page = 1, currency = 'USD', order = 'Market_cap_desc', per_page = 10 }) => {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          vs_currency: currency,
          order: order,
          per_page: per_page,
          page: page,
          sparkline: false,
        },
      }
    );
    return response.data;
  }
);

const marketsSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarkets.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchMarkets.fulfilled,
        (state, {payload}: PayloadAction<Market[]>) => {
          state.loading = false;
          state.data = payload;
        }
      )
      .addCase(fetchMarkets.rejected, (state, {error}) => {
        state.error = error.message || 'Something went wrong';
        state.loading = false;
      });
  },
});

export const selectMarkets = (state: RootState) => state.markets;
export default marketsSlice.reducer;
