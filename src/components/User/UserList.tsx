import React, { useEffect, useState } from 'react';
import { GetProp, TableProps, Popconfirm } from 'antd';
import { Table, Tag, Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { User } from '../../helpers/types';
import { NavLink } from 'react-router-dom';
import { Sort } from '../Sort/Sort';
import { SearchUser } from '../SearchUser/SearchUser';
import {
  deleteUserData,
  sortUserData,
  blockUserData,
  rolesUserData,
} from '../../store/user/user-action';
import { userAction } from '../../store/user/user-slice';
import { LockOutlined, UnlockOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
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
  const sorting = useSelector((state: any) => state.user.sort.sorting);
  const search = useSelector((state: any) => state.user.sort.search);
  const filter = useSelector((state: any) => state.user.sort.filter);
  const error = useSelector((state: any) => state.notifications.error);
  const dispatch: any = useDispatch();
  const token = TokenManager.getToken();
  const sort = search + sorting + filter;

  const handleRole = (id: number, roles: string[]) => {
    let newRoles;

    if (roles.includes('ADMIN')) {
      newRoles = roles.filter((role) => role !== 'ADMIN');
    } else {
      newRoles = [...roles, 'ADMIN'];
    }

    if (token) {
      dispatch(rolesUserData(id, token, sort, newRoles));
    }
  };

  const handleBlock = (id: number, isBlock: boolean) => {
    let block = 'block';

    if (isBlock) {
      block = 'unblock';
    }

    if (token) {
      dispatch(blockUserData(id, token, sort, block));
    }
  };

  const handleDelete = (id: number) => {
    if (token) {
      dispatch(deleteUserData(id, token, sort));
    }
  };

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

  const sortData = () => {
    let sortData = qs.stringify(filterParams) + '&';

    if (qs.stringify(filterParams) == '') {
      sortData = '';
    }

    dispatch(userAction.setSorting(sortData));

    const searching = search + sortData + filter;

    if (token) {
      dispatch(sortUserData(searching, token));
    }
  };

  useEffect(sortData, [filterParams.sortOrder]);

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
            <Popconfirm title='Block user?' onConfirm={() => handleBlock(user.id, user.isBlocked)}>
              <UnlockOutlined className='blocked' />
            </Popconfirm>
          );
        } else {
          return (
            <Popconfirm
              title='Unblock user?'
              onConfirm={() => handleBlock(user.id, user.isBlocked)}
            >
              <LockOutlined className='blocked' />
            </Popconfirm>
          );
        }
      },
    },
    {
      title: 'Role',
      render: (user: User) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {user.roles.includes('ADMIN') ? (
            <Popconfirm
              title='Remove role admin?'
              onConfirm={() => handleRole(user.id, user.roles)}
            >
              <MinusOutlined style={{ marginRight: 8 }} />
            </Popconfirm>
          ) : (
            <Popconfirm title='Add role admin?' onConfirm={() => handleRole(user.id, user.roles)}>
              <PlusOutlined style={{ marginRight: 8 }} />
            </Popconfirm>
          )}
          {user.roles.map((role) => {
            let color = role.length > 5 ? 'geekblue' : 'green';
            return (
              <Tag color={color} key={role}>
                {role.toUpperCase()}
              </Tag>
            );
          })}
        </div>
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
          <NavLink to={`/profile/${user.id}`}>Profile</NavLink>
          <span style={{ marginLeft: 5, marginRight: 5 }}>|</span>
          <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(user.id)}>
            <span style={{ fontWeight: 500, cursor: 'pointer', color: '#646cff' }}>Delete</span>
          </Popconfirm>
        </div>
      ),
    },
  ];

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
