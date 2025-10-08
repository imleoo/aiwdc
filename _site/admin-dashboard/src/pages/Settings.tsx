import React, { useState } from 'react';
import {
  Card,
  Typography,
  Form,
  Input,
  Button,
  Switch,
  Select,
  TextArea,
  Space,
  Tabs,
  Toast,
  Divider,
} from '@douyinfe/semi-ui';
import { IconSave, IconUpload, IconKey, IconMail, IconBell } from '@douyinfe/semi-icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      Toast.success('设置保存成功');
    } catch (error) {
      Toast.error('设置保存失败');
    } finally {
      setLoading(false);
    }
  };

  const handleTestEmail = async () => {
    try {
      Toast.info('正在发送测试邮件...');
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      Toast.success('测试邮件发送成功');
    } catch (error) {
      Toast.error('测试邮件发送失败');
    }
  };

  const GeneralSettings = () => (
    <Form onSubmit={handleSave} labelPosition="top">
      <Title heading={5}>网站基本信息</Title>
      <Form.Input
        field="siteName"
        label="网站名称"
        placeholder="AiWDC Content Automation Platform"
        initValue="AiWDC Content Automation Platform"
      />
      <Form.Input
        field="siteUrl"
        label="网站URL"
        placeholder="https://aiwdc.com"
        initValue="https://aiwdc.com"
      />
      <Form.TextArea
        field="siteDescription"
        label="网站描述"
        placeholder="Connect your data, transform with AI, and publish everywhere"
        initValue="Connect your data, transform with AI, and publish everywhere"
        maxCount={500}
      />
      <Form.Input
        field="adminEmail"
        label="管理员邮箱"
        placeholder="admin@aiwdc.com"
        initValue="admin@aiwdc.com"
      />

      <Divider />

      <Title heading={5}>内容设置</Title>
      <Form.InputNumber
        field="postsPerPage"
        label="每页文章数量"
        placeholder="10"
        initValue={10}
        style={{ width: '100%' }}
      />
      <Form.Switch
        field="enableComments"
        label="启用评论功能"
        initValue={true}
      />
      <Form.Switch
        field="enableRss"
        label="启用RSS订阅"
        initValue={true}
      />
      <Form.Switch
        field="moderateComments"
        label="评论审核"
        initValue={true}
      />

      <div style={{ marginTop: '24px' }}>
        <Button theme="solid" htmlType="submit" loading={loading}>
          保存设置
        </Button>
      </div>
    </Form>
  );

  const PublishSettings = () => (
    <Form onSubmit={handleSave} labelPosition="top">
      <Title heading={5}>自动发布设置</Title>
      <Form.Switch
        field="autoPublish"
        label="启用自动发布"
        initValue={true}
      />
      <Form.Select
        field="publishFrequency"
        label="发布频率"
        style={{ width: '100%' }}
        initValue="daily"
      >
        <Select.Option value="immediate">立即发布</Select.Option>
        <Select.Option value="daily">每日发布</Select.Option>
        <Select.Option value="weekly">每周发布</Select.Option>
        <Select.Option value="monthly">每月发布</Select.Option>
      </Form.Select>
      <Form.TimePicker
        field="publishTime"
        label="发布时间"
        style={{ width: '100%' }}
      />

      <Divider />

      <Title heading={5}>内容质量检查</Title>
      <Form.Switch
        field="enableSpellCheck"
        label="启用拼写检查"
        initValue={true}
      />
      <Form.Switch
        field="enableGrammarCheck"
        label="启用语法检查"
        initValue={true}
      />
      <Form.Switch
        field="enableAiReview"
        label="启用AI内容审核"
        initValue={false}
      />

      <Divider />

      <Title heading={5}>社交媒体设置</Title>
      <Form.InputNumber
        field="maxPostLength"
        label="最大帖子长度"
        placeholder="280"
        initValue={280}
        style={{ width: '100%' }}
      />
      <Form.Switch
        field="addHashtags"
        label="自动添加标签"
        initValue={true}
      />
      <Form.Input
        field="defaultHashtags"
        label="默认标签"
        placeholder="#AI #Automation #Content"
        initValue="#AI #Automation #Content"
      />

      <div style={{ marginTop: '24px' }}>
        <Button theme="solid" htmlType="submit" loading={loading}>
          保存设置
        </Button>
      </div>
    </Form>
  );

  const EmailSettings = () => (
    <Form onSubmit={handleSave} labelPosition="top">
      <Title heading={5}>SMTP设置</Title>
      <Form.Select
        field="provider"
        label="邮件服务提供商"
        style={{ width: '100%' }}
        initValue="gmail"
      >
        <Select.Option value="gmail">Gmail</Select.Option>
        <Select.Option value="outlook">Outlook</Select.Option>
        <Select.Option value="sendgrid">SendGrid</Select.Option>
        <Select.Option value="custom">自定义SMTP</Select.Option>
      </Form.Select>
      <Form.Input
        field="smtpHost"
        label="SMTP服务器"
        placeholder="smtp.gmail.com"
        initValue="smtp.gmail.com"
      />
      <Form.InputNumber
        field="smtpPort"
        label="SMTP端口"
        placeholder="587"
        initValue={587}
        style={{ width: '100%' }}
      />
      <Form.Input
        field="smtpUser"
        label="用户名"
        placeholder="your-email@gmail.com"
      />
      <Form.Input
        field="smtpPassword"
        label="密码"
        type="password"
        placeholder="应用专用密码"
      />
      <Form.Select
        field="encryption"
        label="加密方式"
        style={{ width: '100%' }}
        initValue="tls"
      >
        <Select.Option value="none">无</Select.Option>
        <Select.Option value="ssl">SSL</Select.Option>
        <Select.Option value="tls">TLS</Select.Option>
      </Form.Select>

      <Divider />

      <Title heading={5}>邮件通知</Title>
      <Form.Switch
        field="notifyNewUser"
        label="新用户注册通知"
        initValue={true}
      />
      <Form.Switch
        field="notifyNewArticle"
        label="新文章发布通知"
        initValue={true}
      />
      <Form.Switch
        field="notifyComments"
        label="新评论通知"
        initValue={true}
      />
      <Form.Switch
        field="notifyErrors"
        label="系统错误通知"
        initValue={true}
      />

      <div style={{ marginTop: '24px' }}>
        <Space>
          <Button theme="solid" htmlType="submit" loading={loading}>
            保存设置
          </Button>
          <Button icon={<IconMail />} onClick={handleTestEmail}>
            发送测试邮件
          </Button>
        </Space>
      </div>
    </Form>
  );

  const ApiSettings = () => (
    <Form onSubmit={handleSave} labelPosition="top">
      <Title heading={5}>AI模型API设置</Title>
      <Form.Input
        field="openaiApiKey"
        label="OpenAI API Key"
        type="password"
        placeholder="sk-..."
      />
      <Form.Input
        field="claudeApiKey"
        label="Claude API Key"
        type="password"
        placeholder="sk-ant-..."
      />
      <Form.Input
        field="qwenApiKey"
        label="Qwen API Key"
        type="password"
        placeholder="..."
      />

      <Divider />

      <Title heading={5}>社交媒体API</Title>
      <Form.Input
        field="twitterApiKey"
        label="Twitter API Key"
        type="password"
        placeholder="..."
      />
      <Form.Input
        field="twitterApiSecret"
        label="Twitter API Secret"
        type="password"
        placeholder="..."
      />
      <Form.Input
        field="facebookAppId"
        label="Facebook App ID"
        placeholder="..."
      />
      <Form.Input
        field="facebookAppSecret"
        label="Facebook App Secret"
        type="password"
        placeholder="..."
      />

      <Divider />

      <Title heading={5}>API访问控制</Title>
      <Form.Switch
        field="enableRateLimit"
        label="启用速率限制"
        initValue={true}
      />
      <Form.InputNumber
        field="rateLimit"
        label="每小时请求数限制"
        placeholder="1000"
        initValue={1000}
        style={{ width: '100%' }}
      />
      <Form.Switch
        field="enableApiKeyAuth"
        label="启用API密钥认证"
        initValue={false}
      />
      <Form.TextArea
        field="allowedOrigins"
        label="允许的域名"
        placeholder="https://aiwdc.com"
        initValue="https://aiwdc.com"
        maxCount={500}
      />

      <div style={{ marginTop: '24px' }}>
        <Button theme="solid" htmlType="submit" loading={loading}>
          保存设置
        </Button>
      </div>
    </Form>
  );

  return (
    <div>
      <Title heading={3} style={{ marginBottom: '24px' }}>
        系统设置
      </Title>

      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="基本设置" itemKey="general">
            <GeneralSettings />
          </TabPane>
          <TabPane tab="发布设置" itemKey="publishing">
            <PublishSettings />
          </TabPane>
          <TabPane tab="邮件设置" itemKey="email">
            <EmailSettings />
          </TabPane>
          <TabPane tab="API设置" itemKey="api">
            <ApiSettings />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;