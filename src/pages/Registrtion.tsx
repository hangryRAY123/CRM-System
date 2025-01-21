import { LockOutlined } from '@ant-design/icons';
import { RegForm } from '../components/Form/RegForm';

export const Registration: React.FC = () => {
  return (
    <section className='auth'>
      <div className='lock'>
        <LockOutlined />
      </div>
      <RegForm />
    </section>
  );
};
