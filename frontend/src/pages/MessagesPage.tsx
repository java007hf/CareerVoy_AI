export default function MessagesPage() {
  return (
    <div className="screen">
      <div className="screen-head">
        <div className="screen-title">消息中心</div>
      </div>
      <div className="page">
        <aside className="sidebar">
          <div className="menu-item active">互动消息</div>
          <div className="menu-item">系统通知</div>
          <div className="menu-item">带货通知</div>
        </aside>
        <main className="content">
          <p style={{ color: 'var(--sub)', textAlign: 'center', marginTop: '40px' }}>
            消息列表 - 功能开发中
          </p>
        </main>
      </div>
    </div>
  );
}
