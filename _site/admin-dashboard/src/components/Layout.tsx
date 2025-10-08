import React, { useState } from 'react';
import { Layout as SemiLayout, Nav, Avatar, Dropdown, Space, Divider, Typography } from '@douyinfe/semi-ui';
import {
  IconHome,
  IconEdit,
  IconSend,
  IconHistogram,
  IconSetting,
  IconUser,
  IconExit,
  IconFile,
  IconBell,
  IconKey,
  IconClock,
  IconWallet
} from '@douyinfe/semi-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const { Header, Sider, Content } = SemiLayout;
const { Title } = Typography;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // 按照Semi UI官方规范组织菜单项
  const menuItems = [
    {
      itemKey: '/dashboard',
      text: '数据看板',
      icon: <IconHome />,
    },
    {
      itemKey: '/api-tokens',
      text: 'API令牌',
      icon: <IconKey />,
    },
    {
      itemKey: '/usage-logs',
      text: '使用日志',
      icon: <IconClock />,
    },
    {
      itemKey: '/wallet',
      text: '钱包',
      icon: <IconWallet />,
    },
    {
      itemKey: '/settings',
      text: '个人设置',
      icon: <IconSetting />,
    },
  ];

  const userMenuItems = [
    {
      node: 'item' as const,
      name: '个人资料',
      icon: <IconUser />,
      onClick: () => navigate('/profile'),
    },
    {
      node: 'divider' as const,
    },
    {
      node: 'item' as const,
      name: '退出登录',
      icon: <IconExit />,
      onClick: handleLogout,
    },
  ];

  return (
    <SemiLayout style={{ height: '100vh', width: '100vw' }}>
      <Sider
        style={{
          backgroundColor: 'var(--semi-color-bg-2)',
          borderRight: '1px solid var(--semi-color-border)',
          position: 'relative',
        }}
        collapsed={collapsed}
        onCollapseChange={setCollapsed}
        collapsible
        defaultCollapsed={false}
      >
        {/* Logo区域 */}
        <div style={{
          padding: collapsed ? '16px 8px' : '24px',
          textAlign: 'center',
          borderBottom: '1px solid var(--semi-color-border)',
        }}>
          {!collapsed ? (
            <div>
              <Title heading={4} style={{ margin: 0, color: 'var(--semi-color-primary)' }}>
                Any Router
              </Title>
              <div style={{ fontSize: '12px', color: 'var(--semi-color-text-2)', marginTop: '4px' }}>
                路由管理平台
              </div>
            </div>
          ) : (
            <Title heading={4} style={{ margin: 0, color: 'var(--semi-color-primary)' }}>
              Any Router
            </Title>
          )}
        </div>

        {/* 导航菜单 */}
        <Nav
          mode="vertical"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onSelect={({ itemKey }) => {
            if (typeof itemKey === 'string') {
              navigate(itemKey);
            }
          }}
          onOpenChange={(keys) => {
            setOpenKeys(keys as string[]);
          }}
          style={{
            flex: 1,
            border: 'none',
            backgroundColor: 'transparent',
          }}
          openKeys={openKeys}
        />

        {/* 用户信息区域 */}
        <div style={{
          borderTop: '1px solid var(--semi-color-border)',
          padding: collapsed ? '12px 8px' : '16px',
        }}>
          <Dropdown
            menu={userMenuItems}
            position="topLeft"
            trigger="click"
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '8px 12px',
              borderRadius: '6px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--semi-color-fill-0)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            >
              <Avatar
                size="small"
                src={user?.avatar}
                style={{ flexShrink: 0 }}
              >
                {user?.username?.[0]?.toUpperCase()}
              </Avatar>
              {!collapsed && (
                <div style={{ marginLeft: '12px', overflow: 'hidden' }}>
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--semi-color-text-0)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {user?.username || '管理员'}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--semi-color-text-2)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {user?.email || 'admin@aiwdc.com'}
                  </div>
                </div>
              )}
            </div>
          </Dropdown>
        </div>
      </Sider>

      <SemiLayout>
        <Header style={{
          backgroundColor: 'var(--semi-color-bg-1)',
          borderBottom: '1px solid var(--semi-color-border)',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}>
          {/* 顶部导航菜单 */}
          <Space>
            <span style={{ color: 'var(--semi-color-text-0)', cursor: 'pointer' }}>首页</span>
            <span style={{ color: 'var(--semi-color-text-0)', cursor: 'pointer' }}>控制台</span>
            <span style={{ color: 'var(--semi-color-text-0)', cursor: 'pointer' }}>活动</span>
          </Space>

          {/* 右侧用户操作区 */}
          <Space>
            <span style={{ color: 'var(--semi-color-text-2)', fontSize: '14px' }}>使用指南</span>
            <IconBell style={{ fontSize: '18px', color: 'var(--semi-color-text-2)', cursor: 'pointer' }} />
            <span style={{ color: 'var(--semi-color-text-2)', fontSize: '14px' }}>github.8521</span>
          </Space>
        </Header>

        <Content
          style={{
            padding: '24px',
            backgroundColor: 'var(--semi-color-bg-0)',
            overflow: 'auto',
            height: 'calc(100vh - 64px)',
          }}
        >
          {children}
        </Content>
      </SemiLayout>
    </SemiLayout>
  );
};

export default Layout;