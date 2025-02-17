import React from 'react';
import { Button, Form, Input, Alert } from 'antd';
import { VALIDATE_AUTH } from '../../helpers/constants';
import { CheckCircleOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { ProfileRequest } from '../../helpers/types';

type Profile = {
  error: string;
  form: any;
  isEdit: boolean;
  onFinish: (values: ProfileRequest) => void;
  onValuesChange: (value: ProfileRequest) => void;
  handleEdit: () => void;
};

export const ProfileForm: React.FC<Profile> = (props) => {
  const { error, form, isEdit, onFinish, handleEdit, onValuesChange } = props;

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
      <Form
        style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}
        name='profile'
        form={form}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='username'
            label='Nickname'
            tooltip='What do you want others to call you?'
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
              },
              {
                min: VALIDATE_AUTH.NAME.MIN,
                max: VALIDATE_AUTH.NAME.MAX,
                message: `Name must be between ${VALIDATE_AUTH.PASSWORD.MIN} and ${VALIDATE_AUTH.PASSWORD.MAX} characters`,
              },
            ]}
          >
            <Input readOnly={!isEdit} />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='email'
            label='E-mail'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail! (email@mail.com)',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input readOnly={!isEdit} />
          </Form.Item>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Form.Item
            style={{ marginBottom: 0 }}
            name='phoneNumber'
            label='Phone Number'
            rules={[
              {
                pattern: /^(\+\d{1}[- ]?)?\d{10}$/,
                message: 'Please enter a valid phone number! (+1111111111)',
              },
            ]}
          >
            <Input readOnly={!isEdit} />
          </Form.Item>
        </div>
        <div className='btn-wrapper'>
          {isEdit && (
            <Form.Item>
              <Button type='primary' htmlType='submit' style={{ width: 'fit-content' }}>
                <CheckCircleOutlined />
                Save
              </Button>
              <Button
                type='primary'
                htmlType='button'
                onClick={handleEdit}
                style={{ width: 'fit-content' }}
              >
                <CloseOutlined />
                Cansel
              </Button>
            </Form.Item>
          )}
          {!isEdit && (
            <Button type='primary' htmlType='button' onClick={handleEdit} style={{ width: 'fit-content' }}>
              <EditOutlined />
              Edit profile
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};
