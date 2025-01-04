import { TaskItem } from './script';
import React from 'react';
import { deleteTask, updateTask } from '../../https';
import { useState } from 'react';
import type { FormProps, CheckboxProps } from 'antd';
import { Button, Form, Input, Checkbox } from 'antd';
import {
  CheckCircleOutlined,
  EditOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

export const Task: React.FC<{
  children: React.ReactNode;
  id: number;
  isDone: boolean;
  handleChangeTask: Function;
  title: string;
}> = (props) => {
  let { children, id, isDone, handleChangeTask, title } = props;

  const [edit, setEdit] = useState(false);
  const [checked, setChecked] = useState(isDone);
  const [task, setTask] = useState(title);
  const [error, setError] = useState('');

  type FieldType = {
    newTask: string;
  };

  const handleCansel = () => {
    handleEdit(false);
    setTask(title);
  };

  const handleEdit = (status: boolean) => {
    setEdit(status);
  };

  const updateTaskLocal: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await updateTask(isDone, id, values.newTask);
      await handleChangeTask();
      await handleEdit(false);
    } catch (e: any) {
      setError(e.message || 'Failed update task.');
      return;
    }

    setError('');
  };

  const handleDeleteTaskLocal = async () => {
    try {
      await deleteTask(id);
      await handleChangeTask();
    } catch (error: any) {
      setError(error.message || 'Failed to fetch tasks.');
    }
  };

  const handleChecked: CheckboxProps['onChange'] = async (e) => {
    setChecked(e.target.checked);

    try {
      await updateTask(e.target.checked, id, task);
      await handleChangeTask(task);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch tasks.');
      return;
    }

    setError('');
  };

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <TaskItem>
        <div className='change-task'>
          <Checkbox onChange={handleChecked} checked={checked} />
          {!edit ? (
            <p className={checked ? 'completed' : ''}>{children}</p>
          ) : (
            <Form
              layout='inline'
              name={String(id)}
              style={{ flexWrap: 'nowrap', width: '100%' }}
              initialValues={{ newTask: task }}
              onFinish={updateTaskLocal}
              autoComplete='off'
            >
              <Form.Item<FieldType>
                style={{ flexGrow: 1 }}
                name='newTask'
                rules={[
                  {
                    required: true,
                    min: 2,
                    max: 64,
                    message: 'Task title should be between 2 and 64 characters long.',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item style={{ marginRight: 0 }} label={null}>
                <Button type='primary' htmlType='submit'>
                  <CheckCircleOutlined />
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>

        <div className='btn-container'>
          {!edit ? (
            <Button
              type='primary'
              htmlType='button'
              onClick={() => {
                handleEdit(true);
              }}
            >
              <EditOutlined />
            </Button>
          ) : (
            <Button type='primary' htmlType='button' onClick={handleCansel}>
              <CloseOutlined />
            </Button>
          )}

          <Button
            type='primary'
            htmlType='button'
            color='danger'
            variant='solid'
            onClick={handleDeleteTaskLocal}
          >
            <DeleteOutlined />
          </Button>
        </div>
      </TaskItem>
    </>
  );
};
