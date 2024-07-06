import { TableColumnType } from "antd";

export interface Market {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h:number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply:number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage:number;
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
  currentTheme: 'dark' | 'light';
}

export interface FetchMarketsParams {
  page: number; 
  currency?:'USD' | 'EUR'; 
  order?:'Market_cap_desc'| 'Market_cap_asc';
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
}

export interface FiltersMarketsProps {
  currentQSParams: FetchMarketsParams; 
  setCurrentQSParams: React.Dispatch<React.SetStateAction<FetchMarketsParams>>
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
}

export enum Order {
  MarketCapDesc = "Market_cap_desc",
  MarketCapAsc = "Market_cap_asc",
}