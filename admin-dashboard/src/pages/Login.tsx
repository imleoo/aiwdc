import React, { useState } from 'react';
import { Form, Button, Card, Input, Typography, Space, Banner } from '@douyinfe/semi-ui';
import { IconMail, IconLock, IconUser, IconInfoCircle } from '@douyinfe/semi-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const { Title, Text } = Typography;

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login, register } = useAuthStore();

  const handleSubmit = async (values: LoginFormData | { username: string; email: string; password: string }) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        await login((values as LoginFormData).email, (values as LoginFormData).password);
        setSuccess('登录成功！正在跳转...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        await register(values as { username: string; email: string; password: string });
        setSuccess('注册成功！正在跳转...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      setError(isLogin ? '登录失败，请检查邮箱和密码' : '注册失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--semi-color-bg-0)',
      }}
    >
      <Card
        style={{ width: 400 }}
        bodyStyle={{ padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title heading={2} style={{ margin: 0 }}>
            {isLogin ? '登录' : '注册'}
          </Title>
          <Text type="secondary">
            {isLogin ? '欢迎回到 AiWDC 管理后台' : '创建您的 AiWDC 管理账户'}
          </Text>
        </div>

        {error && (
          <Banner
            type="danger"
            icon={<IconInfoCircle />}
            description={error}
            style={{ marginBottom: '24px' }}
          />
        )}

        {success && (
          <Banner
            type="success"
            description={success}
            style={{ marginBottom: '24px' }}
          />
        )}

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <Form.Input
              field="username"
              label="用户名"
              placeholder="请输入用户名"
              prefix={<IconUser />}
              rules={[{ required: true, message: '请输入用户名' }]}
            />
          )}
          <Form.Input
            field="email"
            label="邮箱"
            placeholder="请输入邮箱"
            prefix={<IconMail />}
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          />
          <Form.Input
            field="password"
            label="密码"
            placeholder="请输入密码"
            prefix={<IconLock />}
            rules={[{ required: true, message: '请输入密码' }]}
          />

          <Button
            theme="solid"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{ marginTop: '24px' }}
          >
            {isLogin ? '登录' : '注册'}
          </Button>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Text type="secondary">
            {isLogin ? '还没有账户？' : '已有账户？'}
            <Button
              theme="borderless"
              type="primary"
              onClick={() => setIsLogin(!isLogin)}
              style={{ padding: '0 4px' }}
            >
              {isLogin ? '立即注册' : '立即登录'}
            </Button>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;