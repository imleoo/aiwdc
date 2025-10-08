import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Card,
  Typography,
  Space,
  Tag,
  Select,
  Modal,
  Form,
  DatePicker,
  Toast,
  Popconfirm,
  Timeline,
  Checkbox,
} from '@douyinfe/semi-ui';
import { IconPlus, IconEdit, IconDelete, IconSend, IconClock, IconTick, IconClose } from '@douyinfe/semi-icons';
import { PublishQueue, Article } from '../types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const Publishing: React.FC = () => {
  const [publishQueue, setPublishQueue] = useState<PublishQueue[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<PublishQueue | null>(null);

  const socialPlatforms = [
    { key: 'twitter', label: 'Twitter', icon: '🐦' },
    { key: 'facebook', label: 'Facebook', icon: '📘' },
    { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { key: 'medium', label: 'Medium', icon: '📝' },
  ];

  useEffect(() => {
    loadPublishQueue();
    loadArticles();
  }, []);

  const loadPublishQueue = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockQueue: PublishQueue[] = [
        {
          id: '1',
          articleId: '1',
          platforms: ['twitter', 'facebook'],
          scheduledAt: '2024-01-22T08:00:00Z',
          status: 'pending',
        },
        {
          id: '2',
          articleId: '2',
          platforms: ['linkedin', 'medium'],
          scheduledAt: '2024-01-21T14:30:00Z',
          status: 'processing',
        },
        {
          id: '3',
          articleId: '3',
          platforms: ['twitter'],
          scheduledAt: '2024-01-20T10:00:00Z',
          status: 'completed',
          publishedAt: '2024-01-20T10:02:00Z',
        },
        {
          id: '4',
          articleId: '4',
          platforms: ['facebook', 'linkedin'],
          scheduledAt: '2024-01-19T16:00:00Z',
          status: 'failed',
          errorMessage: 'Facebook API rate limit exceeded',
        },
      ];
      setPublishQueue(mockQueue);
    } catch (error) {
      Toast.error('加载发布队列失败');
    } finally {
      setLoading(false);
    }
  };

  const loadArticles = async () => {
    try {
      // Mock data - replace with actual API call
      const mockArticles: Article[] = [
        { id: '1', title: 'AI内容自动化的未来趋势', status: 'published' },
        { id: '2', title: 'Jekyll静态站点优化指南', status: 'published' },
        { id: '3', title: '多平台内容发布策略', status: 'published' },
        { id: '4', title: 'React开发最佳实践', status: 'published' },
        { id: '5', title: 'TypeScript入门指南', status: 'published' },
      ];
      setArticles(mockArticles);
    } catch (error) {
      console.error('加载文章列表失败:', error);
    }
  };

  const handleCreateOrEdit = async (values: any) => {
    try {
      if (editingTask) {
        // Update existing task
        setPublishQueue(prev =>
          prev.map(task =>
            task.id === editingTask.id
              ? { ...task, ...values }
              : task
          )
        );
        Toast.success('发布任务更新成功');
      } else {
        // Create new task
        const newTask: PublishQueue = {
          id: Date.now().toString(),
          ...values,
          status: 'pending',
        };
        setPublishQueue(prev => [newTask, ...prev]);
        Toast.success('发布任务创建成功');
      }
      setModalVisible(false);
      setEditingTask(null);
    } catch (error) {
      Toast.error(editingTask ? '发布任务更新失败' : '发布任务创建失败');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setPublishQueue(prev => prev.filter(task => task.id !== id));
      Toast.success('发布任务删除成功');
    } catch (error) {
      Toast.error('发布任务删除失败');
    }
  };

  const handlePublishNow = async (id: string) => {
    try {
      setPublishQueue(prev =>
        prev.map(task =>
          task.id === id
            ? {
                ...task,
                status: 'processing' as const,
                scheduledAt: new Date().toISOString(),
              }
            : task
        )
      );

      // Simulate publishing process
      setTimeout(() => {
        setPublishQueue(prev =>
          prev.map(task =>
            task.id === id
              ? {
                  ...task,
                  status: 'completed' as const,
                  publishedAt: new Date().toISOString(),
                }
              : task
          )
        );
        Toast.success('发布成功');
      }, 3000);

      Toast.info('正在发布...');
    } catch (error) {
      Toast.error('发布失败');
    }
  };

  const getStatusIcon = (status: PublishQueue['status']) => {
    switch (status) {
      case 'pending':
        return <IconClock style={{ color: 'var(--semi-color-warning)' }} />;
      case 'processing':
        return <IconSend style={{ color: 'var(--semi-color-primary)' }} />;
      case 'completed':
        return <IconTick style={{ color: 'var(--semi-color-success)' }} />;
      case 'failed':
        return <IconClose style={{ color: 'var(--semi-color-danger)' }} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: PublishQueue['status']) => {
    switch (status) {
      case 'pending':
        return 'amber';
      case 'processing':
        return 'blue';
      case 'completed':
        return 'green';
      case 'failed':
        return 'red';
      default:
        return 'grey';
    }
  };

  const getPlatformTags = (platforms: string[]) => {
    return platforms.map(platform => {
      const platformConfig = socialPlatforms.find(p => p.key === platform);
      return (
        <Tag key={platform} size="small">
          {platformConfig?.icon} {platformConfig?.label}
        </Tag>
      );
    });
  };

  const columns = [
    {
      title: '文章标题',
      dataIndex: 'articleId',
      render: (articleId: string) => {
        const article = articles.find(a => a.id === articleId);
        return article?.title || `文章 #${articleId}`;
      },
    },
    {
      title: '发布平台',
      dataIndex: 'platforms',
      render: (platforms: string[]) => <Space>{getPlatformTags(platforms)}</Space>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: PublishQueue['status']) => (
        <Space>
          {getStatusIcon(status)}
          <Tag color={getStatusColor(status)}>
            {status === 'pending' && '待发布'}
            {status === 'processing' && '发布中'}
            {status === 'completed' && '已完成'}
            {status === 'failed' && '发布失败'}
          </Tag>
        </Space>
      ),
    },
    {
      title: '计划发布时间',
      dataIndex: 'scheduledAt',
      render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '实际发布时间',
      dataIndex: 'publishedAt',
      render: (time?: string) => time ? dayjs(time).format('YYYY-MM-DD HH:mm') : '-',
    },
    {
      title: '操作',
      render: (record: PublishQueue) => (
        <Space>
          {record.status === 'pending' && (
            <Button
              theme="solid"
              size="small"
              icon={<IconSend />}
              onClick={() => handlePublishNow(record.id)}
            >
              立即发布
            </Button>
          )}
          <Button
            theme="borderless"
            icon={<IconEdit />}
            onClick={() => {
              setEditingTask(record);
              setModalVisible(true);
            }}
            disabled={record.status === 'processing'}
          />
          <Popconfirm
            title="确定要删除这个发布任务吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button
              theme="borderless"
              icon={<IconDelete />}
              type="danger"
              disabled={record.status === 'processing'}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const getArticleTitle = (articleId: string) => {
    const article = articles.find(a => a.id === articleId);
    return article?.title || `文章 #${articleId}`;
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title heading={3} style={{ margin: 0 }}>
          发布管理
        </Title>
        <Button
          theme="solid"
          icon={<IconPlus />}
          onClick={() => {
            setEditingTask(null);
            setModalVisible(true);
          }}
        >
          新建发布任务
        </Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <Card title="发布队列">
          <Table
            columns={columns}
            dataSource={publishQueue}
            loading={loading}
            pagination={{
              pageSize: 10,
            }}
          />
        </Card>

        <Card title="最近发布历史">
          <Timeline>
            {publishQueue
              .filter(task => task.status === 'completed')
              .slice(0, 5)
              .map(task => (
                <Timeline.Item
                  key={task.id}
                  dot={<IconTick style={{ color: 'var(--semi-color-success)' }} />}
                  extra={dayjs(task.publishedAt).format('MM-DD HH:mm')}
                >
                  <Text>{getArticleTitle(task.articleId)}</Text>
                  <br />
                  <Text type="secondary" size="small">
                    发布到: {task.platforms.join(', ')}
                  </Text>
                </Timeline.Item>
              ))}
          </Timeline>
        </Card>
      </div>

      <Card title="发布统计">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'var(--semi-color-fill-0)', borderRadius: '8px' }}>
            <Title heading={2} style={{ margin: 0, color: 'var(--semi-color-warning)' }}>
              {publishQueue.filter(t => t.status === 'pending').length}
            </Title>
            <Text type="secondary">待发布</Text>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'var(--semi-color-fill-0)', borderRadius: '8px' }}>
            <Title heading={2} style={{ margin: 0, color: 'var(--semi-color-primary)' }}>
              {publishQueue.filter(t => t.status === 'processing').length}
            </Title>
            <Text type="secondary">发布中</Text>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'var(--semi-color-fill-0)', borderRadius: '8px' }}>
            <Title heading={2} style={{ margin: 0, color: 'var(--semi-color-success)' }}>
              {publishQueue.filter(t => t.status === 'completed').length}
            </Title>
            <Text type="secondary">已完成</Text>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: 'var(--semi-color-fill-0)', borderRadius: '8px' }}>
            <Title heading={2} style={{ margin: 0, color: 'var(--semi-color-danger)' }}>
              {publishQueue.filter(t => t.status === 'failed').length}
            </Title>
            <Text type="secondary">发布失败</Text>
          </div>
        </div>
      </Card>

      <Modal
        title={editingTask ? '编辑发布任务' : '新建发布任务'}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingTask(null);
        }}
        footer={null}
        width={600}
      >
        <Form
          initValues={editingTask || {}}
          onSubmit={handleCreateOrEdit}
          labelPosition="top"
        >
          <Form.Select
            field="articleId"
            label="选择文章"
            style={{ width: '100%' }}
            rules={[{ required: true, message: '请选择要发布的文章' }]}
          >
            {articles.map(article => (
              <Select.Option key={article.id} value={article.id}>
                {article.title}
              </Select.Option>
            ))}
          </Form.Select>
          <Form.Section title="发布平台">
            <Form.CheckboxGroup
              field="platforms"
              rules={[{ required: true, message: '请至少选择一个发布平台' }]}
            >
              {socialPlatforms.map(platform => (
                <Checkbox key={platform.key} value={platform.key}>
                  {platform.icon} {platform.label}
                </Checkbox>
              ))}
            </Form.CheckboxGroup>
          </Form.Section>
          <Form.DatePicker
            field="scheduledAt"
            label="计划发布时间"
            type="dateTime"
            style={{ width: '100%' }}
            rules={[{ required: true, message: '请选择发布时间' }]}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
            <Button
              onClick={() => {
                setModalVisible(false);
                setEditingTask(null);
              }}
            >
              取消
            </Button>
            <Button theme="solid" htmlType="submit">
              {editingTask ? '更新' : '创建'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Publishing;