import React from 'react';
import { Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import TokenManager from '../../helpers/token-manager';
import { sortUserData } from '../../store/user/user-action';
import { userAction } from '../../store/user/user-slice';

const { Search } = Input;

export const SearchUser: React.FC = () => {
  const isLoading = useSelector((state: any) => state.user.isLoading);
  const sort = useSelector((state: any) => state.user.sort);
  const dispatch: any = useDispatch();
  const token = TokenManager.getToken();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let search = 'search=' + e.target.value + '&' + sort;
    dispatch(userAction.setSort(search));

    if (token) {
      dispatch(sortUserData(search, token));
    }
  };

  return (
    <Form>
      <Search
        style={{ marginBottom: 20 }}
        onChange={handleChange}
        placeholder='Enter user email'
        loading={isLoading}
      />
    </Form>
  );
};
