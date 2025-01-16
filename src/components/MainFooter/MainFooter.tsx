import { Layout } from 'antd';
const { Footer } = Layout;

export const MainFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©{new Date().getFullYear()} Created by Ant UED
    </Footer>
  );
};
