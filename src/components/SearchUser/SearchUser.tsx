import React from 'react';
import { Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import TokenManager from '../../helpers/token-manager';
import { sortUserData } from '../../store/user/user-action';
import { userAction } from '../../store/user/user-slice';

const { Search } = Input;

export const SearchUser: React.FC = () => {
  const isLoading = useSelector((state: any) => state.user.isLoading);
  const sorting = useSelector((state: any) => state.user.sort.sorting);
  const filter = useSelector((state: any) => state.user.sort.filter);
  const dispatch: any = useDispatch();
  const token = TokenManager.getToken();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let search = 'search=' + e.target.value + '&';
    if (e.target.value == '') {
      search = '';
    }
    dispatch(userAction.setSearch(search));

    const searching = search + filter + sorting;

    if (token) {
      dispatch(sortUserData(searching, token));
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
