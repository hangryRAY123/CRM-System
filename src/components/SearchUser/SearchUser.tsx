import React from 'react';
import { Input, Form } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { storeAction } from '../../store/store-slice';

const { Search } = Input;

export const SearchUser: React.FC = () => {
  const isLoading = useSelector((state: any) => state.store.isLoading);
  const dispatch: any = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let searching: string | undefined = e.target.value;
    if (e.target.value === '') {
      searching = undefined;
    }
    dispatch(storeAction.setSearch(searching));
    dispatch(storeAction.setPaginationCurrent(0));
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
