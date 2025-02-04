import React, { useEffect, useState } from 'react';
import { GetProp, TableProps, Popconfirm } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
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
  updateRolesUserData,
} from '../../store/user/user-action';
import { userAction } from '../../store/user/user-slice';
import { LockOutlined, UnlockOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

export const UserList: React.FC = () => {
  const users = useSelector((state: any) => state.user.data);
  const total = useSelector((state: any) => state.user.total);
  const isLoading = useSelector((state: any) => state.user.isLoading);
  const error = useSelector((state: any) => state.notifications.error);
  const dispatch: any = useDispatch();
  const sort = useSelector((state: any) => state.user.sort);

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
    },
  });

  const handleRole = (id: number, roles: string[]) => {
    let newRoles;

    if (roles.includes('ADMIN')) {
      newRoles = roles.filter((role) => role !== 'ADMIN');
    } else {
      newRoles = [...roles, 'ADMIN'];
    }

    dispatch(updateRolesUserData(id, sort, newRoles));
  };

  const handleBlock = (id: number, isBlock: boolean) => {
    let block = 'block';

    if (isBlock) {
      block = 'unblock';
    }

    dispatch(blockUserData(id, sort, block));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUserData(id, sort));
  };

  const handleTableChange: TableProps<User>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.current) {
      dispatch(userAction.setPaginationCurrent(pagination.current - 1));
    }
    dispatch(userAction.setSortField(Array.isArray(sorter) ? undefined : sorter.field));
    dispatch(userAction.setSortOrder(Array.isArray(sorter) ? undefined : sorter.order));
  };

  useEffect(() => {
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: total,
      },
    });

    dispatch(sortUserData(sort));
  }, [sort, total]);

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
