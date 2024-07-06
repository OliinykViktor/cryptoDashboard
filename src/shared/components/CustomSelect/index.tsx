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