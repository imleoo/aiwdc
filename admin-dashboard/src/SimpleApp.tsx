import React, { useState } from 'react';
import { Button, Card, Typography, Input, Toast } from '@douyinfe/semi-ui';

const { Title, Text } = Typography;

const SimpleApp: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      setIsLoggedIn(true);
      Toast.success('登录成功！');
    } else {
      Toast.error('请输入邮箱和密码');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    Toast.info('已退出登录');
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--semi-color-bg-0)'
      }}>
        <Card
          style={{ width: 400, padding: '40px' }}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Title heading={2}>AiWDC 管理后台</Title>
            <Text type="secondary">AI内容自动化平台</Text>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Input
              placeholder="请输入邮箱"
              value={email}
              onChange={setEmail}
              style={{ marginBottom: '16px' }}
            />
            <Input
              type="password"
              placeholder="请输入密码"
              value={password}
              onChange={setPassword}
              style={{ marginBottom: '24px' }}
            />
          </div>

          <Button
            theme="solid"
            block
            size="large"
            onClick={handleLogin}
          >
            登录
          </Button>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <Text type="secondary" size="small">
              提示：输入任意邮箱和密码即可登录
            </Text>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      backgroundColor: 'var(--semi-color-bg-0)',
      padding: '20px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <Title heading={3}>🎉 欢迎使用 AiWDC 管理后台</Title>
        <Button onClick={handleLogout}>退出登录</Button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        <Card>
          <Title heading={4}>📊 仪表板</Title>
          <Text>查看数据统计和概览信息</Text>
        </Card>

        <Card>
          <Title heading={4}>📝 文章管理</Title>
          <Text>创建、编辑和发布文章内容</Text>
        </Card>

        <Card>
          <Title heading={4}>📤 发布管理</Title>
          <Text>管理定时发布和多平台推送</Text>
        </Card>

        <Card>
          <Title heading={4}>🌐 社交媒体</Title>
          <Text>连接和管理社交媒体账户</Text>
        </Card>

        <Card>
          <Title heading={4}>📈 数据统计</Title>
          <Text>查看详细的分析报告</Text>
        </Card>

        <Card>
          <Title heading={4}>⚙️ 系统设置</Title>
          <Text>配置平台参数和API设置</Text>
        </Card>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        backgroundColor: 'var(--semi-color-fill-0)',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <Title heading={4}>✨ 系统功能验证成功！</Title>
        <Text type="secondary">
          您已成功登录 AiWDC 后台管理系统。以下是可用的功能模块。
        </Text>
        <div style={{ marginTop: '16px' }}>
          <Text strong>用户信息：</Text> {email}
        </div>
      </div>
    </div>
  );
};

export default SimpleApp;