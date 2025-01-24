import React from 'react';
import { Select, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { sortUserData } from '../../store/user/user-action';
import { userAction } from '../../store/user/user-slice';
import TokenManager from '../../helpers/token-manager';

export const Sort: React.FC = () => {
  const dispatch: any = useDispatch();
  const token = TokenManager.getToken();

  const handleChange = (value: string) => {
    dispatch(userAction.setIsBlocked(value));
    if (token) {
      dispatch(sortUserData(value, token));
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
          { value: '&isBlocked=true', label: 'Blocked' },
          { value: '&isBlocked=false', label: 'Active' },
        ]}
      />
    </Space>
  );
};
