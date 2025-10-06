import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Button,
  Space,
  Table,
  Tag,
  Modal,
  Form,
  Input,
  Toast,
  Timeline,
  Badge,
  Switch,
} from '@douyinfe/semi-ui';
import { IconLink, IconTick, IconClose, IconRefresh, IconEdit } from '@douyinfe/semi-icons';
import { SocialMedia } from '../types';

const { Title, Text } = Typography;

const SocialMediaPage: React.FC = () => {
  const [socialAccounts, setSocialAccounts] = useState<SocialMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [connectModalVisible, setConnectModalVisible] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [connectionLogs, setConnectionLogs] = useState<any[]>([]);

  const platforms = [
    {
      key: 'twitter',
      name: 'Twitter',
      icon: '🐦',
      color: '#1DA1F2',
      description: '连接您的Twitter账户以自动发布推文',
      authUrl: 'https://twitter.com/i/oauth2/authorize',
    },
    {
      key: 'facebook',
      name: 'Facebook',
      icon: '📘',
      color: '#4267B2',
      description: '连接Facebook页面以自动发布帖子',
      authUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    },
    {
      key: 'linkedin',
      name: 'LinkedIn',
      icon: '💼',
      color: '#0077B5',
      description: '连接LinkedIn账户以自动发布动态',
      authUrl: 'https://www.linkedin.com/oauth/v2/authorization',
    },
    {
      key: 'medium',
      name: 'Medium',
      icon: '📝',
      color: '#00AB6C',
      description: '连接Medium账户以自动发布文章',
      authUrl: 'https://medium.com/m/oauth/authorize',
    },
  ];

  useEffect(() => {
    loadSocialAccounts();
    loadConnectionLogs();
  }, []);

  const loadSocialAccounts = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockAccounts: SocialMedia[] = [
        {
          id: '1',
          platform: 'twitter',
          connected: true,
          accountId: '123456789',
          accountName: '@aiwcd',
        },
        {
          id: '2',
          platform: 'facebook',
          connected: true,
          accountId: '987654321',
          accountName: 'AiWDC Page',
        },
        {
          id: '3',
          platform: 'linkedin',
          connected: false,
        },
        {
          id: '4',
          platform: 'medium',
          connected: false,
        },
      ];
      setSocialAccounts(mockAccounts);
    } catch (error) {
      Toast.error('加载社交媒体账户失败');
    } finally {
      setLoading(false);
    }
  };

  const loadConnectionLogs = async () => {
    try {
      // Mock data - replace with actual API call
      const mockLogs = [
        {
          id: '1',
          platform: 'twitter',
          action: 'connect',
          message: '成功连接Twitter账户 @aiwcd',
          timestamp: '2024-01-20 14:30:00',
          status: 'success',
        },
        {
          id: '2',
          platform: 'facebook',
          action: 'publish',
          message: '成功发布文章到Facebook页面',
          timestamp: '2024-01-20 12:15:00',
          status: 'success',
        },
        {
          id: '3',
          platform: 'linkedin',
          action: 'disconnect',
          message: 'LinkedIn连接已断开',
          timestamp: '2024-01-19 16:45:00',
          status: 'warning',
        },
        {
          id: '4',
          platform: 'twitter',
          action: 'publish',
          message: 'Twitter发布失败：API限制',
          timestamp: '2024-01-19 10:20:00',
          status: 'error',
        },
      ];
      setConnectionLogs(mockLogs);
    } catch (error) {
      console.error('加载连接日志失败:', error);
    }
  };

  const handleConnect = (platformKey: string) => {
    setSelectedPlatform(platformKey);
    setConnectModalVisible(true);
  };

  const handleOAuthConnect = () => {
    const platform = platforms.find(p => p.key === selectedPlatform);
    if (platform) {
      // In a real app, this would open OAuth flow
      Toast.info(`正在连接到${platform.name}...`);

      // Simulate OAuth connection
      setTimeout(() => {
        const newAccount: SocialMedia = {
          id: Date.now().toString(),
          platform: selectedPlatform as SocialMedia['platform'],
          connected: true,
          accountId: 'new_account_id',
          accountName: `Demo ${platform.name} Account`,
        };

        setSocialAccounts(prev =>
          prev.map(account =>
            account.platform === selectedPlatform ? newAccount : account
          )
        );

        setConnectModalVisible(false);
        Toast.success(`${platform.name}连接成功！`);

        // Add to connection logs
        const newLog = {
          id: Date.now().toString(),
          platform: selectedPlatform,
          action: 'connect',
          message: `成功连接${platform.name}账户`,
          timestamp: new Date().toLocaleString(),
          status: 'success',
        };
        setConnectionLogs(prev => [newLog, ...prev]);
      }, 2000);
    }
  };

  const handleDisconnect = async (platform: SocialMedia['platform']) => {
    try {
      // Mock API call - replace with actual API
      setSocialAccounts(prev =>
        prev.map(account =>
          account.platform === platform
            ? { ...account, connected: false, accountId: undefined, accountName: undefined }
            : account
        )
      );
      Toast.success('账户已断开连接');

      // Add to connection logs
      const newLog = {
        id: Date.now().toString(),
        platform,
        action: 'disconnect',
        message: `${platform}连接已断开`,
        timestamp: new Date().toLocaleString(),
        status: 'warning',
      };
      setConnectionLogs(prev => [newLog, ...prev]);
    } catch (error) {
      Toast.error('断开连接失败');
    }
  };

  const handleRefresh = async (platform: SocialMedia['platform']) => {
    try {
      // Mock API call - replace with actual API
      Toast.info('正在刷新连接状态...');
      setTimeout(() => {
        Toast.success('连接状态已更新');
      }, 1000);
    } catch (error) {
      Toast.error('刷新失败');
    }
  };

  const getLogIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <IconTick style={{ color: 'var(--semi-color-success)' }} />;
      case 'error':
        return <IconClose style={{ color: 'var(--semi-color-danger)' }} />;
      case 'warning':
        return <IconRefresh style={{ color: 'var(--semi-color-warning)' }} />;
      default:
        return null;
    }
  };

  const connectedCount = socialAccounts.filter(account => account.connected).length;
  const totalCount = socialAccounts.length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title heading={3} style={{ margin: 0 }}>
          社交媒体管理
        </Title>
        <Badge count={connectedCount} maxcount={totalCount}>
          <Tag color="blue">已连接 {connectedCount}/{totalCount} 个平台</Tag>
        </Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {platforms.map(platform => {
          const account = socialAccounts.find(a => a.platform === platform.key);
          const isConnected = account?.connected || false;

          return (
            <Card
              key={platform.key}
              title={
                <Space>
                  <span style={{ fontSize: '24px' }}>{platform.icon}</span>
                  <span>{platform.name}</span>
                  {isConnected && <Tag color="green">已连接</Tag>}
                </Space>
              }
              style={{ height: '200px' }}
            >
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <Text type="secondary">{platform.description}</Text>
                  {isConnected && account?.accountName && (
                    <div style={{ marginTop: '8px' }}>
                      <Text strong>账户：</Text>
                      <Text>{account.accountName}</Text>
                    </div>
                  )}
                </div>
                <Space>
                  {isConnected ? (
                    <>
                      <Button
                        theme="light"
                        icon={<IconRefresh />}
                        onClick={() => handleRefresh(platform.key as SocialMedia['platform'])}
                      >
                        刷新
                      </Button>
                      <Button
                        theme="light"
                        type="danger"
                        onClick={() => handleDisconnect(platform.key as SocialMedia['platform'])}
                      >
                        断开连接
                      </Button>
                    </>
                  ) : (
                    <Button
                      theme="solid"
                      icon={<IconLink />}
                      onClick={() => handleConnect(platform.key)}
                    >
                      连接
                    </Button>
                  )}
                </Space>
              </div>
            </Card>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card title="发布设置">
          <Space vertical style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>自动发布</Text>
              <Switch />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>发布前预览</Text>
              <Switch defaultChecked />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>错误重试</Text>
              <Switch defaultChecked />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text>发布通知</Text>
              <Switch defaultChecked />
            </div>
          </Space>
        </Card>

        <Card title="连接历史">
          <Timeline>
            {connectionLogs.slice(0, 5).map(log => (
              <Timeline.Item
                key={log.id}
                dot={getLogIcon(log.status)}
                extra={log.timestamp}
              >
                <Text>{log.message}</Text>
                <br />
                <Text type="secondary" size="small">
                  {platforms.find(p => p.key === log.platform)?.name} - {log.action}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      </div>

      <Modal
        title={`连接到 ${platforms.find(p => p.key === selectedPlatform)?.name}`}
        visible={connectModalVisible}
        onCancel={() => setConnectModalVisible(false)}
        footer={null}
        width={500}
      >
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>
            {platforms.find(p => p.key === selectedPlatform)?.icon}
          </div>
          <Title heading={4}>
            连接到 {platforms.find(p => p.key === selectedPlatform)?.name}
          </Title>
          <Text type="secondary" style={{ marginBottom: '24px', display: 'block' }}>
            您将被重定向到 {platforms.find(p => p.key === selectedPlatform)?.name} 授权页面，
            授权完成后将自动返回此页面。
          </Text>

          <Space>
            <Button onClick={() => setConnectModalVisible(false)}>
              取消
            </Button>
            <Button theme="solid" onClick={handleOAuthConnect}>
              授权连接
            </Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default SocialMediaPage;