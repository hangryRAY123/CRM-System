import { addingTask } from '../../https';
import { useState } from 'react';
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

export const AddTask: React.FC<{
  handleAddTask: (newTask: string) => void;
}> = (props) => {
  const [error, setError] = useState('');
  const [formNewTask] = Form.useForm();

  type FieldType = {
    newTask: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await addingTask(values.newTask);
      await props.handleAddTask(values.newTask);
      formNewTask.resetFields();
    } catch (e: any) {
      setError(e.message || 'Failed to add task. Please try again later.');
      return;
    }
    setError('');
  };

  return (
    <>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Form
        layout='inline'
        name='newTask'
        form={formNewTask}
        style={{ flexWrap: 'nowrap', width: '100%', marginBottom: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
          <Input placeholder='Task To Be Done...' />
        </Form.Item>

        <Form.Item style={{ marginRight: 0 }} label={null}>
          <Button type='primary' htmlType='submit'>
            Add
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
