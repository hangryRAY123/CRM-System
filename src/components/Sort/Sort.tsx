import React from 'react';
import { Select, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { sortUserData } from '../../store/user/user-action';
import { userAction } from '../../store/user/user-slice';
import TokenManager from '../../helpers/token-manager';

export const Sort: React.FC = () => {
  const dispatch: any = useDispatch();
  const token = TokenManager.getToken();
  const sorting = useSelector((state: any) => state.user.sort.sorting);
  const search = useSelector((state: any) => state.user.sort.search);

  const handleChange = (value: string) => {
    dispatch(userAction.setFilter(value));
    const sort = search + sorting + value;
    if (token) {
      dispatch(sortUserData(sort, token));
    }
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
          { value: 'isBlocked=true&', label: 'Blocked' },
          { value: 'isBlocked=false&', label: 'Active' },
        ]}
      />
    </Space>
  );
};
