import React from 'react';
import { Select, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { storeAction } from '../../store/store-slice';

export const Sort: React.FC = () => {
  const dispatch: any = useDispatch();

  const handleChange = (value: undefined | boolean | string) => {
    if (value === '') {
      value = undefined;
    }

    dispatch(storeAction.setBlocked(value));
    dispatch(storeAction.setPaginationCurrent(0));
  };

  return (
    <Space style={{ marginBottom: 20 }}>
      Filter:
      <Select
        defaultValue='all'
        style={{ width: 100, textAlign: 'left' }}
        onChange={handleChange}
        options={[
          { value: '', label: 'All' },
          { value: true, label: 'Blocked' },
          { value: false, label: 'Active' },
        ]}
      />
    </Space>
  );
};
