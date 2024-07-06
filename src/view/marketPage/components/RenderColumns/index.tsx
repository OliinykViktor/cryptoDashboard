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
