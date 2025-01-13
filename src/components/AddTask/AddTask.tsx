import { addingTask } from '../../api/https';
import { useState } from 'react';
import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { VALIDATE_TASK } from '../../helpers/constants';

export const AddTask: React.FC<{
  changeTask: (newTask: string) => void;
}> = (props) => {
  const [error, setError] = useState<string>('');
  const [formNewTask] = Form.useForm();

  type FieldType = {
    newTask: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      await addingTask(values.newTask);
      await props.changeTask(values.newTask);
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
              min: VALIDATE_TASK.MIN_TITLE_LENGHT,
              max: VALIDATE_TASK.MAX_TITLE_LENGHT,
              message: `Task title should be between ${VALIDATE_TASK.MIN_TITLE_LENGHT} and ${VALIDATE_TASK.MAX_TITLE_LENGHT} characters long.`,
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
