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
