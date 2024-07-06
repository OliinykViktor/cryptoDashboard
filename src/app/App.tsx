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