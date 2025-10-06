import React, { useEffect, useState } from 'react';
import { Card, Typography, Row, Col, Space, List, Avatar, Tag, Progress } from '@douyinfe/semi-ui';
import { IconUser, IconEdit, IconSearch, IconArrowUp } from '@douyinfe/semi-icons';
import { Analytics, Activity } from '../types';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockAnalytics: Analytics = {
      totalUsers: 1247,
      totalArticles: 89,
      totalViews: 15842,
      publishedThisMonth: 12,
      userGrowth: 23.5,
      articleGrowth: 15.3,
      viewGrowth: 45.2,
      recentActivity: [
        {
          id: '1',
          type: 'article_published',
          message: '发布了新文章《AI内容自动化的未来趋势》',
          timestamp: '2024-01-20 14:30',
          userId: '1',
          articleId: '45',
        },
        {
          id: '2',
          type: 'user_registered',
          message: '新用户 admin@aiwdc.com 注册',
          timestamp: '2024-01-20 13:45',
          userId: '2',
        },
        {
          id: '3',
          type: 'social_connected',
          message: '连接了 Twitter 账户 @aiwcd',
          timestamp: '2024-01-20 12:20',
          userId: '1',
        },
        {
          id: '4',
          type: 'article_created',
          message: '创建了新文章《Jekyll静态站点优化指南》',
          timestamp: '2024-01-20 11:15',
          userId: '1',
          articleId: '46',
        },
      ],
    };

    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, []);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: number;
    trendType?: 'up' | 'down';
  }> = ({ title, value, icon, trend, trendType }) => (
    <Card style={{ height: '140px' }}>
      <Space>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--semi-color-primary-light-default)',
            color: 'var(--semi-color-primary)',
            fontSize: '24px',
          }}
        >
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <Text type="secondary" size="small">
            {title}
          </Text>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <Title heading={2} style={{ margin: 0 }}>
              {value}
            </Title>
            {trend && (
              <Tag
                color={trendType === 'up' ? 'green' : 'red'}
                size="small"
              >
                {trendType === 'up' ? '+' : ''}{trend}%
              </Tag>
            )}
          </div>
        </div>
      </Space>
    </Card>
  );

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'article_published':
      case 'article_created':
        return <IconEdit />;
      case 'user_registered':
        return <IconUser />;
      case 'social_connected':
        return <IconSearch />;
      default:
        return <IconSearch />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'article_published':
      case 'article_created':
        return 'var(--semi-color-success)';
      case 'user_registered':
        return 'var(--semi-color-primary)';
      case 'social_connected':
        return 'var(--semi-color-warning)';
      default:
        return 'var(--semi-color-default)';
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Text>加载中...</Text>
      </div>
    );
  }

  return (
    <div>
      <Title heading={3} style={{ marginBottom: '24px' }}>
        仪表板概览
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <StatCard
            title="总用户数"
            value={analytics?.totalUsers}
            icon={<IconUser />}
            trend={analytics?.userGrowth}
            trendType="up"
          />
        </Col>
        <Col span={6}>
          <StatCard
            title="文章总数"
            value={analytics?.totalArticles}
            icon={<IconEdit />}
            trend={analytics?.articleGrowth}
            trendType="up"
          />
        </Col>
        <Col span={6}>
          <StatCard
            title="总浏览量"
            value={analytics?.totalViews}
            icon={<IconSearch />}
            trend={analytics?.viewGrowth}
            trendType="up"
          />
        </Col>
        <Col span={6}>
          <StatCard
            title="本月发布"
            value={analytics?.publishedThisMonth}
            icon={<IconArrowUp />}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="最近活动" style={{ height: '400px' }}>
            <List
              dataSource={analytics?.recentActivity}
              renderItem={(item: Activity) => (
                <List.Item>
                  <Space align="start">
                    <Avatar
                      size="small"
                      style={{
                        backgroundColor: getActivityColor(item.type),
                      }}
                    >
                      {getActivityIcon(item.type)}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <Text>{item.message}</Text>
                      <div>
                        <Text type="secondary" size="small">
                          {item.timestamp}
                        </Text>
                      </div>
                    </div>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={16}>
          <Card title="内容发布统计" style={{ height: '400px' }}>
            <div style={{ marginBottom: '24px' }}>
              <Space justify="space-between" style={{ width: '100%' }}>
                <Text>文章发布进度</Text>
                <Text type="secondary">本月目标: 20篇</Text>
              </Space>
              <Progress
                percent={(analytics?.publishedThisMonth || 0) * 5}
                showInfo
                size="large"
              />
            </div>

            <div>
              <Title heading={5}>平台数据分布</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <div style={{ padding: '16px', backgroundColor: 'var(--semi-color-fill-0)', borderRadius: '8px' }}>
                    <Text type="secondary">官方网站</Text>
                    <div style={{ marginTop: '8px' }}>
                      <Title heading={4} style={{ margin: 0 }}>8,452</Title>
                      <Text type="secondary" size="small">访问量</Text>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{ padding: '16px', backgroundColor: 'var(--semi-color-fill-0)', borderRadius: '8px' }}>
                    <Text type="secondary">社交媒体</Text>
                    <div style={{ marginTop: '8px' }}>
                      <Title heading={4} style={{ margin: 0 }}>7,390</Title>
                      <Text type="secondary" size="small">互动量</Text>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;