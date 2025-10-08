import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Card,
  Typography,
  Space,
  Tag,
  Input,
  Select,
  Modal,
  Form,
  TextArea,
  Switch,
  DatePicker,
  Toast,
  Popconfirm,
} from '@douyinfe/semi-ui';
import { IconEdit, IconPlus, IconDelete, IconSearch, IconEyeOpened, IconClock } from '@douyinfe/semi-icons';
import { Article } from '../types';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockArticles: Article[] = [
        {
          id: '1',
          title: 'AI内容自动化的未来趋势',
          content: '人工智能技术在内容创作领域的应用正在快速发展...',
          excerpt: '探讨AI如何改变内容创作流程，提高创作效率',
          category: 'Documentation',
          tags: ['AI', '自动化', '内容创作'],
          featured: true,
          status: 'published',
          publishedAt: '2024-01-15T10:00:00Z',
          readTime: 8,
          image: 'https://example.com/image1.jpg',
          author: 'admin',
          createdAt: '2024-01-14T15:30:00Z',
          updatedAt: '2024-01-15T09:45:00Z',
        },
        {
          id: '2',
          title: 'Jekyll静态站点优化指南',
          content: 'Jekyll作为静态网站生成器，在性能优化方面有很多技巧...',
          excerpt: '详细介绍Jekyll站点的性能优化方法',
          category: 'Tutorials',
          tags: ['Jekyll', '静态站点', '优化'],
          featured: false,
          status: 'draft',
          readTime: 12,
          author: 'editor',
          createdAt: '2024-01-13T11:20:00Z',
          updatedAt: '2024-01-16T14:30:00Z',
        },
        {
          id: '3',
          title: '多平台内容发布策略',
          content: '在数字时代，内容需要同时在多个平台上发布...',
          excerpt: '如何制定有效的内容发布策略',
          category: 'Blog',
          tags: ['发布策略', '多平台', '内容营销'],
          featured: false,
          status: 'scheduled',
          scheduledFor: '2024-01-25T08:00:00Z',
          readTime: 6,
          author: 'admin',
          createdAt: '2024-01-12T09:15:00Z',
          updatedAt: '2024-01-18T16:20:00Z',
        },
      ];

      setArticles(mockArticles);
    } catch (error) {
      Toast.error('加载文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrEdit = async (values: any) => {
    try {
      if (editingArticle) {
        // Update existing article
        setArticles(prev =>
          prev.map(article =>
            article.id === editingArticle.id
              ? {
                  ...article,
                  ...values,
                  updatedAt: new Date().toISOString(),
                }
              : article
          )
        );
        Toast.success('文章更新成功');
      } else {
        // Create new article
        const newArticle: Article = {
          id: Date.now().toString(),
          ...values,
          author: 'admin',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          readTime: Math.ceil(values.content.length / 1000),
        };
        setArticles(prev => [newArticle, ...prev]);
        Toast.success('文章创建成功');
      }
      setModalVisible(false);
      setEditingArticle(null);
    } catch (error) {
      Toast.error(editingArticle ? '文章更新失败' : '文章创建失败');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setArticles(prev => prev.filter(article => article.id !== id));
      Toast.success('文章删除成功');
    } catch (error) {
      Toast.error('文章删除失败');
    }
  };

  const handleStatusChange = async (id: string, status: Article['status']) => {
    try {
      setArticles(prev =>
        prev.map(article =>
          article.id === id
            ? {
                ...article,
                status,
                publishedAt: status === 'published' ? new Date().toISOString() : undefined,
                updatedAt: new Date().toISOString(),
              }
            : article
        )
      );
      Toast.success('状态更新成功');
    } catch (error) {
      Toast.error('状态更新失败');
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchKeyword.toLowerCase());
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (text: string, record: Article) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" size="small">
            {record.excerpt}
          </Text>
        </div>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: Article['status'], record: Article) => {
        const statusMap = {
          draft: { color: 'grey', text: '草稿' },
          published: { color: 'green', text: '已发布' },
          scheduled: { color: 'blue', text: '已定时' },
        };
        const config = statusMap[status];
        return (
          <Space>
            <Tag color={config.color}>{config.text}</Tag>
            {status === 'scheduled' && (
              <Text type="secondary" size="small">
                {dayjs(record.scheduledFor).format('MM-DD HH:mm')}
              </Text>
            )}
          </Space>
        );
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '阅读时间',
      dataIndex: 'readTime',
      render: (time: number) => `${time}分钟`,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      render: (time: string) => dayjs(time).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: '操作',
      render: (record: Article) => (
        <Space>
          <Button
            theme="borderless"
            icon={<IconEyeOpened />}
            onClick={() => window.open(`/articles/${record.id}`, '_blank')}
          />
          <Button
            theme="borderless"
            icon={<IconEdit />}
            onClick={() => {
              setEditingArticle(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="确定要删除这篇文章吗？"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button theme="borderless" icon={<IconDelete />} type="danger" />
          </Popconfirm>
          {record.status !== 'published' && (
            <Button
              theme="solid"
              size="small"
              onClick={() => handleStatusChange(record.id, 'published')}
            >
              发布
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Title heading={3} style={{ margin: 0 }}>
          文章管理
        </Title>
        <Button
          theme="solid"
          icon={<IconPlus />}
          onClick={() => {
            setEditingArticle(null);
            setModalVisible(true);
          }}
        >
          新建文章
        </Button>
      </div>

      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Space>
            <Input
              placeholder="搜索文章标题或内容..."
              prefix={<IconSearch />}
              value={searchKeyword}
              onChange={setSearchKeyword}
              style={{ width: 300 }}
            />
            <Select
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 120 }}
            >
              <Select.Option value="all">全部状态</Select.Option>
              <Select.Option value="draft">草稿</Select.Option>
              <Select.Option value="published">已发布</Select.Option>
              <Select.Option value="scheduled">已定时</Select.Option>
            </Select>
          </Space>
        </div>

        <Table
          columns={columns}
          dataSource={filteredArticles}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
          }}
          rowSelection={{
            selectedRowKeys: selectedRows,
            onChange: setSelectedRows,
          }}
        />
      </Card>

      <Modal
        title={editingArticle ? '编辑文章' : '新建文章'}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingArticle(null);
        }}
        footer={null}
        width={800}
      >
        <Form
          initValues={editingArticle || {}}
          onSubmit={handleCreateOrEdit}
          labelPosition="top"
        >
          <Form.Input
            field="title"
            label="文章标题"
            placeholder="请输入文章标题"
            rules={[{ required: true, message: '请输入文章标题' }]}
          />
          <Form.Select
            field="category"
            label="分类"
            style={{ width: '100%' }}
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select.Option value="Documentation">Documentation</Select.Option>
            <Select.Option value="Tutorials">Tutorials</Select.Option>
            <Select.Option value="Templates">Templates</Select.Option>
            <Select.Option value="Blog">Blog</Select.Option>
          </Form.Select>
          <Form.TextArea
            field="excerpt"
            label="摘要"
            placeholder="请输入文章摘要"
            maxCount={200}
            rows={3}
          />
          <Form.TextArea
            field="content"
            label="内容"
            placeholder="请输入文章内容（支持Markdown）"
            maxCount={10000}
            rows={15}
            rules={[{ required: true, message: '请输入文章内容' }]}
          />
          <Form.Input
            field="tags"
            label="标签"
            placeholder="请输入标签，用逗号分隔"
          />
          <Form.Switch
            field="featured"
            label="设为精选"
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
            <Button
              onClick={() => {
                setModalVisible(false);
                setEditingArticle(null);
              }}
            >
              取消
            </Button>
            <Button theme="solid" htmlType="submit">
              {editingArticle ? '更新' : '创建'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Articles;