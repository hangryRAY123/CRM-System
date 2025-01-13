import { TaskItem } from './style';
import React from 'react';
import { deleteTask, updateTask } from '../../https';
import { useState } from 'react';
import { VALIDATE_TASK } from '../../helpers/constants';
import type { FormProps, CheckboxProps } from 'antd';
import { Button, Form, Input, Checkbox } from 'antd';
import {
  CheckCircleOutlined,
  EditOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

type TaskProps = {
  children: React.ReactNode;
  id: number;
  isDone: boolean;
  changeTask: () => void;
  title: string;
};

export const Task: React.FC<TaskProps> = (props) => {
  let { children, id, isDone, changeTask, title } = props;

  const [isEdit, setEdit] = useState<boolean>(false);
  const [isChecked, setChecked] = useState<boolean>(isDone);
  const [task, setTask] = useState<string>(title);
  const [error, setError] = useState<string>('');

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

  const handleUpdateTask: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await updateTask(isDone, id, values.newTask);
      await changeTask();
      await handleEdit(false);
    } catch (e: any) {
      setError(e.message || 'Failed update task.');
      return;
    }

    setError('');
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(id);
      await changeTask();
    } catch (error: any) {
      setError(error.message || 'Failed to fetch tasks.');
    }
  };

  const handleChecked: CheckboxProps['onChange'] = async (e) => {
    setChecked(e.target.checked);

    try {
      await updateTask(e.target.checked, id, task);
      await changeTask();
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
          <Checkbox onChange={handleChecked} checked={isChecked} />
          {!isEdit ? (
            <p className={isChecked ? 'completed' : ''}>{children}</p>
          ) : (
            <Form
              layout='inline'
              style={{ flexWrap: 'nowrap', width: '100%' }}
              initialValues={{ newTask: task }}
              onFinish={handleUpdateTask}
              autoComplete='off'
            >
              <Form.Item<FieldType>
                style={{ flexGrow: 1 }}
                name='newTask'
                rules={[
                  {
                    required: true,
                    min: VALIDATE_TASK.MIN_TITLE_LENGHT,
                    max: VALIDATE_TASK.MAX_TITLE_LENGHT,
                    message: `Task title should be between ${VALIDATE_TASK.MIN_TITLE_LENGHT} and ${VALIDATE_TASK.MAX_TITLE_LENGHT} characters long.`,
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
          {!isEdit ? (
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
            onClick={handleDeleteTask}
          >
            <DeleteOutlined />
          </Button>
        </div>
      </TaskItem>
    </>
  );
};
