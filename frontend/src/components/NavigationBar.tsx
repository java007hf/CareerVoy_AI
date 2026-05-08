export default function NavigationBar() {
  return (
    <div className="topbar">
      <div className="brand">CareerVoy AI</div>
      <div className="top-right">
        <div className="top-search">🔍 搜索内容或商品</div>
        <div className="top-bell">🔔<span className="top-dot"></span></div>
        <div className="avatar" title="用户头像"></div>
      </div>
    </div>
  );
}
