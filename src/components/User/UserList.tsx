import React, { useEffect, useState } from 'react';
import { GetProp, TableProps, Popconfirm } from 'antd';
import { Table, Tag, Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../../helpers/types';
import { NavLink } from 'react-router-dom';
import { Sort } from '../Sort/Sort';
import { SearchUser } from '../SearchUser/SearchUser';
import { deleteUserData, sortUserData } from '../../store/user/user-action';
import {
  LockOutlined,
  UnlockOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from '@ant-design/icons';
import TokenManager from '../../helpers/token-manager';
import qs from 'qs';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

interface FilterParams {
  sortOrder?: string;
  sortBy?: string;
}

export const UserList: React.FC = () => {
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [filterParams, setFilterParams] = useState<FilterParams>({});
  const users = useSelector((state: any) => state.user.data);
  const isLoading = useSelector((state: any) => state.user.isLoading);
  const isBlocked = useSelector((state: any) => state.user.isBlocked);
  const error = useSelector((state: any) => state.notifications.error);
  const dispatch: any = useDispatch();
  const token = TokenManager.getToken();

  const handleBlock = (id: number) => {
    if (token) {
      console.log(id);
    }
  };

  const handleDelete = (id: number) => {
    if (token) {
      dispatch(deleteUserData(id, token));
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: 'Name',
      dataIndex: 'username',
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Blocked',
      render: (user) => {
        if (!user.isBlocked) {
          return (
            <Popconfirm title='Block user?' onConfirm={() => handleBlock(user.id)}>
              <UnlockOutlined className='blocked' />
            </Popconfirm>
          );
        } else {
          return (
            <Popconfirm title='Unblock user?' onConfirm={() => handleBlock(user.id)}>
              <LockOutlined className='blocked' />
            </Popconfirm>
          );
        }
      },
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      render: (tags: string[]) => (
        <span>
          {tags.includes('ADMIN') ? (
            <UserDeleteOutlined className='blocked' />
          ) : (
            <UserAddOutlined className='blocked' />
          )}
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag style={{ marginBottom: 8 }} color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
    },
    {
      title: 'Actions',
      key: 'action',
      fixed: 'right',
      width: 100,
      render: (user: User) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NavLink to={`/user/${user.id}`}>Profile</NavLink>
          <span style={{ marginLeft: 5, marginRight: 5 }}>|</span>
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(user.id)}>
            <span style={{ fontWeight: 500, cursor: 'pointer', color: '#646cff' }}>Delete</span>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const sortData = () => {
    const sort = qs.stringify(filterParams) + isBlocked;

    if (token) {
      dispatch(sortUserData(sort, token));
    }

    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: 0,
      },
    });
  };

  useEffect(sortData, [filterParams.sortOrder]);

  const handleTableChange: TableProps<User>['onChange'] = (pagination, filters, sorter) => {
    setFilterParams({
      sortBy: Array.isArray(sorter) ? undefined : sorter.field?.toString(),
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order?.replace('end', ''),
    });
    setTableParams({
      pagination,
      filters,
    });
  };

  return (
    <>
      {error && (
        <Alert
          style={{ width: 'fit-content', marginBottom: 15 }}
          message={error}
          type='error'
          showIcon
          closable
        />
      )}
      <SearchUser />
      <Sort />
      <Table<User>
        columns={columns}
        rowKey={(user) => user.id}
        dataSource={users}
        pagination={tableParams.pagination}
        loading={isLoading}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};
