import React, { useEffect, useState } from 'react';
import { GetProp, TableProps, Popconfirm } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { Table, Tag, Alert } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { User, Roles } from '../../helpers/types';
import { NavLink } from 'react-router-dom';
import { Sort } from '../Sort/Sort';
import { SearchUser } from '../SearchUser/SearchUser';
import { userAction } from '../../store/user/user-slice';
import { notificationsAction } from '../../store/notification/notifications-slice';
import { LockOutlined, UnlockOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { getUsers, deleteUser, blockUser, updateRolesUser } from '../../api/users';

type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<any>([]);
  const isLoading = useSelector((state: any) => state.user.isLoading);
  const error = useSelector((state: any) => state.notifications.error);
  const sort = useSelector((state: any) => state.user.sort);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 20,
      showSizeChanger: false,
    },
  });
  const dispatch: any = useDispatch();

  const handleRole = async (id: number, roles: string[]) => {
    let newRoles;

    if (roles.includes('ADMIN')) {
      newRoles = roles.filter((role) => role !== 'ADMIN');
    } else {
      newRoles = [...roles, 'ADMIN'];
    }

    try {
      dispatch(userAction.setIsLoading(true));
      await updateRolesUser(id, newRoles);
      const usersData = await getUsers(sort);
      setUsers(usersData.data);
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to change user role. Please try again later.'
        )
      );
    }
  };

  const handleBlock = async (id: number, isBlock: boolean) => {
    let block = 'block';

    if (isBlock) {
      block = 'unblock';
    }

    try {
      dispatch(userAction.setIsLoading(true));
      await blockUser(id, block);
      const usersData = await getUsers(sort);
      setUsers(usersData.data);
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to block user. Please try again later.'
        )
      );
    }
  };

  const handleDelete = async (id: number) => {
    try {
      dispatch(userAction.setIsLoading(true));
      await deleteUser(id);
      const usersData = await getUsers(sort);
      setUsers(usersData.data);
      dispatch(userAction.setIsLoading(false));
    } catch (error: any) {
      dispatch(
        notificationsAction.setError(
          error.response.data || 'Failed to delete user. Please try again later.'
        )
      );
    }
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
    dispatch(
      userAction.setSortOrder(Array.isArray(sorter) ? undefined : sorter.order?.replace('end', ''))
    );
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        dispatch(userAction.setIsLoading(true));
        const usersData = await getUsers(sort);
        setUsers(usersData.data);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: usersData.meta.totalAmount,
          },
        });
        dispatch(userAction.setIsLoading(false));
      } catch (error: any) {
        dispatch(userAction.setIsLoading(false));
        dispatch(
          notificationsAction.setError(
            error.response.data || 'Failed to sort users. Please try again later.'
          )
        );
      }
    };
    getUserData();
  }, [sort]);

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
      render: (date) => <>{new Date(date).toLocaleString()}</>,
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
          {user.roles.includes('ADMIN' as Roles) ? (
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
