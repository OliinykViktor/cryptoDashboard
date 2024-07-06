export const codeMirrorsMockData = `

//src/app/redux/slices/marketsSlice.ts

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

//src/shared/models/markerPage.ts

import { createSlice } from '@reduxjs/toolkit';

import { ThemeState } from '../../../types';
import { RootState } from '../store';

const initialState:ThemeState = {
  currentTheme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, {payload}) {
      state.currentTheme = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

export const currentTheme = (state: RootState) => state.theme.currentTheme;

//src/app/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';

import marketsReducer from './slices/marketsSlice';
import themeSlice from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    markets: marketsReducer,
    theme: themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


//src/app/App.tsx

import React, { useEffect } from 'react';
import { ConfigProvider, theme } from 'antd';
import { useSelector } from 'react-redux';

import MarketPage from '../view/marketPage';
import { currentTheme } from './redux/slices/themeSlice';

const App: React.FC = () => {
  const scheme = useSelector(currentTheme);
  const { defaultAlgorithm, darkAlgorithm } = theme;
  
  useEffect(() => {
    if (scheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [scheme]);

  return (
    <ConfigProvider
      theme={{
        algorithm: scheme === 'light' ? defaultAlgorithm : darkAlgorithm
      }}
    >
      <MarketPage />
    </ConfigProvider>
  );
};

export default App;

//src/shared/components/index.ts

//ui
export { default as ThemeSwitcher } from './ThemeSwitcher';
export { default as CustomSelect } from './CustomSelect';


import React from 'react';

import { Select } from 'antd';
import { CustomSelectProps } from '../../../types';

const CustomSelect = <T extends string>({ arrayOptons, value, onChange, style }: CustomSelectProps<T>) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      style={style}
    >
      {arrayOptons.map((option) => (
        <Select.Option
          key={option}
          value={option}
        >
          {option}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CustomSelect;

import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';

import { AppDispatch } from '../../../app/redux/store';
import { currentTheme, setTheme } from '../../../app/redux/slices/themeSlice';

const ThemeSwitcher: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const scheme = useSelector(currentTheme);

  const toggleTheme = () => {
    const nextTheme = scheme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(nextTheme));
  };

  return (
    <Button type='primary' onClick={toggleTheme} style={style.btn}>
      {scheme.toUpperCase()}
    </Button>
  );
};

export default ThemeSwitcher;

const style = {
  btn: {
    marginLeft: 'auto',
    marginRight: 0,
  }
}

//src/shared/models/markerPage.ts

export const COINS_TABLE_HEADER = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Current Price',
    dataIndex: 'current_price',
    key: 'current_price',
  },
  {
    title: 'Circulating Supply',
    dataIndex: 'market_cap',
    key: 'market_cap',
  },
];

export const COINS_FILTERS = {
  currency: ['USD', 'EUR'],
  order: ['Market_cap_desc', 'Market_cap_asc'],
};

export const marketPageSizeOptions=['5', '10', '20', '50'];


//src/types/index.ts

import { TableColumnType } from "antd";

export interface Market {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: string;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
}

export interface MarketsState {
  data: Market[];
  loading: boolean;
  error: boolean | string;
}

export interface ThemeState {
  currentTheme: "dark" | "light";
}

export interface FetchMarketsParams {
  page: number;
  currency?: "USD" | "EUR";
  order?: "Market_cap_desc" | "Market_cap_asc";
  per_page: 5 | 10 | 20 | 50 | 100;
}

export interface CodeModalProps {
  isOpenModal: boolean;
  toggleModal: () => void;
}

export interface CustomSelectProps<T> {
  value: T;
  arrayOptons: T[];
  onChange: (value: T) => void;
  style?: React.CSSProperties;
}

export interface RenderColumnsProps<T> {
  columns: TableColumnType<T>[];
  currency: Currency;
}

export interface FiltersMarketsProps {
  currentQSParams: FetchMarketsParams;
  setCurrentQSParams: React.Dispatch<React.SetStateAction<FetchMarketsParams>>;
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
}

export enum Order {
  MarketCapDesc = "Market_cap_desc",
  MarketCapAsc = "Market_cap_asc",
}

export enum PerPage {
  Five = 5,
  Ten = 10,
  Twenty = 20,
  Fifty = 50,
  Hundred = 100
}

//src/view/marketPage/index.tsx

import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, Result, Table, Typography } from 'antd';
import CodeMirror, { defaultLightThemeOption } from '@uiw/react-codemirror';
import { basicDark } from '@uiw/codemirror-theme-basic';
import { typescriptLanguage } from '@codemirror/lang-javascript';

import { AppDispatch } from '../../app/redux/store';
import { fetchMarkets, selectMarkets } from '../../app/redux/slices/marketsSlice';
import { COINS_TABLE_HEADER, marketPageSizeOptions } from '../../shared/models/markerPage';
import { ThemeSwitcher } from '../../shared/components';
import { Currency, FetchMarketsParams, Market, PerPage } from '../../types';
import { Filters, RenderColumns } from './components';
import { currentTheme } from '../../app/redux/slices/themeSlice';
import { codeMirrorsMockData } from '../../shared/models/codeMirrorsMockData';

const MarketPage: FC = () => {
  const [currentQSParams, setCurrentQSParams] = useState<FetchMarketsParams>({
    page: 1,
    currency: 'USD',
    order: 'Market_cap_desc',
    per_page: 10
  });

  const dispatch = useDispatch<AppDispatch>();
  const scheme = useSelector(currentTheme);
  const { data, loading, error } = useSelector(selectMarkets);

  const fetchMarketData = useCallback(() => {
    dispatch(fetchMarkets({ ...currentQSParams }));
  }, [dispatch, currentQSParams])

  useEffect(() => {
    fetchMarketData()
  }, [fetchMarketData]);

  if (error) return <Result subTitle={error} />;

  const columns = RenderColumns<Market>({ columns: COINS_TABLE_HEADER, currency: currentQSParams.currency as Currency });

  const handlePaginate = (page: number, pageSize: PerPage) =>{
    setCurrentQSParams((prevParams) => ({
      ...prevParams,
      page,
      per_page: pageSize
    }))
  };

  return (
    <div style={styles.wrapper as React.CSSProperties}>
      <ThemeSwitcher />
      <Typography style={styles.title as React.CSSProperties}>
        Coins & Markets
      </Typography>
      <Filters currentQSParams={currentQSParams} setCurrentQSParams={setCurrentQSParams} />
      <Table
        dataSource={data}
        columns={columns}
        rowKey='id'
        loading={loading}
        pagination={false}
        style={styles.table as React.CSSProperties}
      />
      <Pagination
        current={currentQSParams.page}
        total={10000}
        onChange={handlePaginate}
        pageSize={currentQSParams.per_page}
        showSizeChanger
        pageSizeOptions={marketPageSizeOptions}
        style={styles.pagination as React.CSSProperties}
      />
      <Typography
        style={styles.title as React.CSSProperties}>
        App source code
      </Typography>
      <CodeMirror
        value={codeMirrorsMockData}
        theme={scheme === 'light' ? defaultLightThemeOption : basicDark}
        aria-autocomplete='list'
        height='1000px'
        extensions={[typescriptLanguage]}
      />
    </div>
  );
};

export default MarketPage;

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24,
    gap: 24,
  },
  pagination: {
    margin: '16px 0px',
    textAlign: 'center',
    justifyContent: 'flex-end',
  },
  table: {
    marginTop: 10
  },
  title: {
    textAlign: 'left',
    fontSize: 24,
  },
};


//src/view/marketPage/components/index.ts

export { default as RenderColumns } from './RenderColumns';
export { default as Filters } from './Filters';

import React, { FC } from 'react';

import { CustomSelect } from '../../../../shared/components';
import { COINS_FILTERS } from '../../../../shared/models/markerPage';
import { Currency, FiltersMarketsProps, Order } from '../../../../types';

const Filters: FC<FiltersMarketsProps> = ({
  currentQSParams,
  setCurrentQSParams,
}) => {
  return (
    <div style={styles.wrapper as React.CSSProperties}>
      <CustomSelect
        value={currentQSParams.currency as Currency}
        onChange={(value) =>
          setCurrentQSParams((prevParams) => ({
            ...prevParams,
            currency: value as Currency,
          }))
        }
        style={styles.currencySelect as React.CSSProperties}
        arrayOptons={COINS_FILTERS.currency}
      />
      <CustomSelect
        value={currentQSParams.order as Order}
        onChange={(value) =>
          setCurrentQSParams((prevParams) => ({
            ...prevParams,
            order: value as Order,
          }))
        }
        style={styles.orderSelect as React.CSSProperties}
        arrayOptons={COINS_FILTERS.order}
      />
    </div>
  );
};

export default Filters;

const styles = {
  wrapper: {
    display:'flex',
    gap:24,
  },
  currencySelect: {
    width: 120,
    textAlign: 'left',
  },
  orderSelect: {
    width: 180,
    textAlign: 'left'
  }
};


import React from 'react';
import { Image, Space, TableColumnType } from 'antd';

import { RenderColumnsProps } from '../../../../types';

const RenderColumns = <T extends { name: string; image?: string}>({
  columns,
  currency
}: RenderColumnsProps<T>): TableColumnType<T>[] => {
  return columns.map((column) => {
    if (column.key === 'name') {
      return {
        ...column,
        render: (name: string, record: T) => (
          <Space>
            {record.image && (
              <Image
                src={record.image}
                alt={name}
                width={24}
              />
            )}
            <span>{name}</span>
          </Space>
        ),
      };
    }
    if (column.key === 'current_price') {
      return {
        ...column,
        render: (record) => (
          <span>{record} {currency.toLowerCase()}</span>
        ),
      };
    }
    return column as TableColumnType<T>;
  });
};

export default RenderColumns;


//src/main.tsx

import React from 'react';
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';

import App from './app/App';
import { store } from './app/redux/store';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
`;
