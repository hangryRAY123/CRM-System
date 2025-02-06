import React from 'react';
import { Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { userAction } from '../../store/user/user-slice';

const { Search } = Input;

export const SearchUser: React.FC = () => {
  const isLoading = useSelector((state: any) => state.user.isLoading);
  const dispatch: any = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let searching: string | undefined = e.target.value;
    if (e.target.value === '') {
      searching = undefined;
    }
    dispatch(userAction.setSearch(searching));
    dispatch(userAction.setPaginationCurrent(0));
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
