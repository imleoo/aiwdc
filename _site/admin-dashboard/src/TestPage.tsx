import React from 'react';

const TestPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎉 测试页面</h1>
      <p>如果您能看到这个页面，说明 React 应用正在正常运行！</p>
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <p><strong>技术栈验证：</strong></p>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>✅ React 18 + TypeScript</li>
          <li>✅ Vite 开发服务器</li>
          <li>✅ 基本组件渲染</li>
        </ul>
      </div>
    </div>
  );
};

export default TestPage;