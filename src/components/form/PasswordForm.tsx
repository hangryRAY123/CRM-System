import { useState, useEffect } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { VALIDATE_AUTH } from '../../helpers/constants';
import { Button, Modal, Form, Input, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { storeAction } from '../../store/store-slice';
import { updatePaswword } from '../../api/profile';

export const PasswordForm = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const error = useSelector((state: any) => state.store.notifications.error);
  const success = useSelector((state: any) => state.store.notifications.success);
  const dispatch: any = useDispatch();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onFinish = async (password: any) => {
    try {
      await updatePaswword(password);
      dispatch(storeAction.setSuccess('Password changed successfully'));
      dispatch(storeAction.setError(''));
    } catch (error: any) {
      dispatch(
        storeAction.setError(
          error.response.data || 'Failed to update password. Please try again later.'
        )
      );
    }
  };

  useEffect(() => {
    form.resetFields();
  }, [success]);

  return (
    <>
      <Button htmlType='button' onClick={showModal} style={{ width: 'fit-content', marginTop: 30 }}>
        <EditOutlined />
        Edit password
      </Button>
      <Modal
        forceRender
        open={open}
        title='Enter new password'
        onCancel={handleCancel}
        footer={(_) => <></>}
      >
        {error && (
          <Alert
            style={{ width: 'fit-content', marginLeft: 'auto', marginBottom: 15 }}
            message={error}
            type='error'
            showIcon
            closable
          />
        )}
        {success && (
          <Alert
            style={{ width: 'fit-content', marginLeft: 'auto', marginBottom: 15 }}
            message={success}
            type='success'
            showIcon
          />
        )}

        <Form form={form} name='newPassword' onFinish={onFinish}>
          <Form.Item
            name='newPassword'
            label='New Password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: VALIDATE_AUTH.PASSWORD.MIN,
                max: VALIDATE_AUTH.PASSWORD.MAX,
                message: `Password must be between ${VALIDATE_AUTH.PASSWORD.MIN} and ${VALIDATE_AUTH.PASSWORD.MAX} characters`,
              },
            ]}
            hasFeedback
          >
            <Input.Password autoComplete='off' />
          </Form.Item>

          <Form.Item
            name='confirmNewPassword'
            label='Confirm New Password'
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your new password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The new password that you entered do not match!')
                  );
                },
              }),
            ]}
          >
            <Input.Password autoComplete='off' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' style={{ width: '100%' }}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
