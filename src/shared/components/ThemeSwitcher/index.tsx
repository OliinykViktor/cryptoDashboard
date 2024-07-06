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
    <Button type='primary' onClick={toggleTheme}>
      {scheme.toUpperCase()}
    </Button>
  );
};

export default ThemeSwitcher;