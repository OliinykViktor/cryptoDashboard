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
