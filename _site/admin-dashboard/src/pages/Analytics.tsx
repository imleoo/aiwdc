import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Space,
  Select,
  DatePicker,
  Table,
  Tag,
  Progress,
  List,
  Avatar,
} from '@douyinfe/semi-ui';
import {
  IconArrowUp,
  IconArrowDown,
  IconUser,
  IconEdit,
  IconSearch,
  IconHistogram,
} from '@douyinfe/semi-icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface AnalyticsData {
  totalUsers: number;
  totalArticles: number;
  totalViews: number;
  userGrowth: number;
  articleGrowth: number;
  viewGrowth: number;
  popularArticles: Array<{
    id: string;
    title: string;
    views: number;
    growth: number;
  }>;
  platformStats: Array<{
    platform: string;
    views: number;
    engagement: number;
    posts: number;
  }>;
  userActivity: Array<{
    date: string;
    users: number;
    articles: number;
    views: number;
  }>;
}

const Analytics: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState<string>('7d');
  const [platform, setPlatform] = useState<string>('all');

  useEffect(() => {
    loadAnalytics();
  }, [timeRange, platform]);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockData: AnalyticsData = {
        totalUsers: 1247,
        totalArticles: 89,
        totalViews: 15842,
        userGrowth: 23.5,
        articleGrowth: 15.3,
        viewGrowth: 45.2,
        popularArticles: [
          { id: '1', title: 'AI内容自动化的未来趋势', views: 3421, growth: 12.5 },
          { id: '2', title: 'Jekyll静态站点优化指南', views: 2890, growth: 8.3 },
          { id: '3', title: 'React开发最佳实践', views: 2456, growth: -2.1 },
          { id: '4', title: 'TypeScript入门指南', views: 1987, growth: 15.7 },
          { id: '5', title: '多平台内容发布策略', views: 1543, growth: 6.9 },
        ],
        platformStats: [
          { platform: '官网', views: 8452, engagement: 4.8, posts: 89 },
          { platform: 'Twitter', views: 3210, engagement: 8.2, posts: 45 },
          { platform: 'Facebook', views: 2156, engagement: 6.5, posts: 32 },
          { platform: 'LinkedIn', views: 1890, engagement: 3.9, posts: 28 },
          { platform: 'Medium', views: 134, engagement: 12.1, posts: 12 },
        ],
        userActivity: [
          { date: '2024-01-20', users: 45, articles: 3, views: 892 },
          { date: '2024-01-19', users: 38, articles: 2, views: 756 },
          { date: '2024-01-18', users: 52, articles: 4, views: 1024 },
          { date: '2024-01-17', users: 41, articles: 1, views: 678 },
          { date: '2024-01-16', users: 35, articles: 2, views: 543 },
          { date: '2024-01-15', users: 48, articles: 3, views: 912 },
          { date: '2024-01-14', users: 29, articles: 1, views: 423 },
        ],
      };

      setData(mockData);
    } catch (error) {
      console.error('加载统计数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    growth?: number;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, growth, icon, color }) => (
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
            backgroundColor: `${color}15`,
            color: color,
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
            {growth !== undefined && (
              <Space>
                {growth >= 0 ? (
                  <IconArrowUp style={{ color: 'var(--semi-color-success)' }} />
                ) : (
                  <IconArrowDown style={{ color: 'var(--semi-color-danger)' }} />
                )}
                <Text
                  type={growth >= 0 ? 'success' : 'danger'}
                  size="small"
                >
                  {growth >= 0 ? '+' : ''}{growth}%
                </Text>
              </Space>
            )}
          </div>
        </div>
      </Space>
    </Card>
  );

  const activityColumns = [
    {
      title: '日期',
      dataIndex: 'date',
      render: (date: string) => dayjs(date).format('MM-DD'),
    },
    {
      title: '活跃用户',
      dataIndex: 'users',
      render: (users: number) => (
        <Space>
          <IconUser style={{ color: 'var(--semi-color-primary)' }} />
          {users}
        </Space>
      ),
    },
    {
      title: '新增文章',
      dataIndex: 'articles',
      render: (articles: number) => (
        <Space>
          <IconEdit style={{ color: 'var(--semi-color-success)' }} />
          {articles}
        </Space>
      ),
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      render: (views: number) => (
        <Space>
          <IconSearch style={{ color: 'var(--semi-color-warning)' }} />
          {views}
        </Space>
      ),
    },
  ];

  const platformColumns = [
    {
      title: '平台',
      dataIndex: 'platform',
      render: (platform: string) => (
        <Tag color="blue">{platform}</Tag>
      ),
    },
    {
      title: '浏览量',
      dataIndex: 'views',
      render: (views: number) => views.toLocaleString(),
    },
    {
      title: '互动率',
      dataIndex: 'engagement',
      render: (engagement: number) => `${engagement}%`,
    },
    {
      title: '发布数量',
      dataIndex: 'posts',
    },
    {
      title: '表现',
      dataIndex: 'views',
      render: (views: number, record: any) => {
        const maxViews = Math.max(...(data?.platformStats.map(p => p.views) || [1]));
        const percentage = (views / maxViews) * 100;
        return <Progress percent={percentage} showInfo={false} size="small" />;
      },
    },
  ];

  if (!data) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <Text>加载中...</Text>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title heading={3} style={{ margin: 0 }}>
          数据统计
        </Title>
        <Space>
          <Select
            value={timeRange}
            onChange={setTimeRange}
            style={{ width: 120 }}
          >
            <Select.Option value="7d">最近7天</Select.Option>
            <Select.Option value="30d">最近30天</Select.Option>
            <Select.Option value="90d">最近90天</Select.Option>
            <Select.Option value="1y">最近一年</Select.Option>
          </Select>
          <Select
            value={platform}
            onChange={setPlatform}
            style={{ width: 120 }}
          >
            <Select.Option value="all">全部平台</Select.Option>
            <Select.Option value="web">官网</Select.Option>
            <Select.Option value="social">社交媒体</Select.Option>
          </Select>
        </Space>
      </div>

      {/* 总体统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <StatCard
            title="总用户数"
            value={data.totalUsers.toLocaleString()}
            growth={data.userGrowth}
            icon={<IconUser />}
            color="var(--semi-color-primary)"
          />
        </Col>
        <Col span={6}>
          <StatCard
            title="文章总数"
            value={data.totalArticles.toLocaleString()}
            growth={data.articleGrowth}
            icon={<IconEdit />}
            color="var(--semi-color-success)"
          />
        </Col>
        <Col span={6}>
          <StatCard
            title="总浏览量"
            value={data.totalViews.toLocaleString()}
            growth={data.viewGrowth}
            icon={<IconSearch />}
            color="var(--semi-color-warning)"
          />
        </Col>
        <Col span={6}>
          <StatCard
            title="互动率"
            value="5.8%"
            growth={2.3}
            icon={<IconHistogram />}
            color="var(--semi-color-info)"
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {/* 热门文章 */}
        <Col span={12}>
          <Card title="热门文章" style={{ height: '400px' }}>
            <List
              dataSource={data.popularArticles}
              renderItem={(article, index) => (
                <List.Item>
                  <Space align="start" style={{ width: '100%' }}>
                    <div style={{ width: '32px', textAlign: 'center' }}>
                      <Avatar
                        size="small"
                        style={{
                          backgroundColor: index < 3 ? 'var(--semi-color-primary)' : 'var(--semi-color-default)',
                        }}
                      >
                        {index + 1}
                      </Avatar>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text>{article.title}</Text>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                        <Text type="secondary" size="small">
                          {article.views.toLocaleString()} 次浏览
                        </Text>
                        <Space>
                          {article.growth >= 0 ? (
                            <IconArrowUp style={{ color: 'var(--semi-color-success)', fontSize: '14px' }} />
                          ) : (
                            <IconArrowDown style={{ color: 'var(--semi-color-danger)', fontSize: '14px' }} />
                          )}
                          <Text
                            type={article.growth >= 0 ? 'success' : 'danger'}
                            size="small"
                          >
                            {article.growth >= 0 ? '+' : ''}{article.growth}%
                          </Text>
                        </Space>
                      </div>
                    </div>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* 用户活动 */}
        <Col span={12}>
          <Card title="用户活动趋势" style={{ height: '400px' }}>
            <Table
              columns={activityColumns}
              dataSource={data.userActivity}
              pagination={false}
              size="small"
              rowKey="date"
            />
          </Card>
        </Col>
      </Row>

      {/* 平台统计 */}
      <Card title="平台表现统计" style={{ marginTop: '16px' }}>
        <Table
          columns={platformColumns}
          dataSource={data.platformStats}
          pagination={false}
          rowKey="platform"
        />
      </Card>
    </div>
  );
};

export default Analytics;