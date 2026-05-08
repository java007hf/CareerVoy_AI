export default function ProfilePage() {
  return (
    <div className="screen">
      <div className="screen-head">
        <div className="screen-title">我的</div>
      </div>
      <div className="page">
        <aside className="sidebar">
          <div className="menu-item">💰 带货收入</div>
          <div className="menu-item">💬 消息中心</div>
          <div className="menu-item">⚙️ 个人设置</div>
        </aside>
        <main className="content">
          <p style={{ color: 'var(--sub)', textAlign: 'center', marginTop: '40px' }}>
            个人主页 - 功能开发中
          </p>
        </main>
      </div>
    </div>
  );
}
