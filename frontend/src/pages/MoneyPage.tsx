export default function MoneyPage() {
  return (
    <div className="screen">
      <div className="screen-head">
        <div className="screen-title">搞钱中心</div>
      </div>
      <div className="page">
        <aside className="sidebar">
          <div className="menu-item active">选品广场</div>
          <div className="menu-item">我的推广</div>
          <div className="menu-item">收益看板</div>
          <div className="menu-item">新手入门</div>
        </aside>
        <main className="content">
          <p style={{ color: 'var(--sub)', textAlign: 'center', marginTop: '40px' }}>
            选品广场 - 功能开发中
          </p>
        </main>
      </div>
    </div>
  );
}
