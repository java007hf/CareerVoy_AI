import { useNavigate } from 'react-router-dom';

export default function MoneyPage() {
  const navigate = useNavigate();
  const menuItems = [
    { name: '社区', path: '/community' },
    { name: '搞钱', path: '/money' },
    { name: '消息', path: '/messages' },
    { name: '我的', path: '/profile' },
  ];
  const subItems = ['选品广场', '我的推广', '收益看板', '新手入门'];

  return (
    <div className="screen">
      <div className="screen-head">
        <div className="screen-title">搞钱 · 选品广场</div>
      </div>
      <div className="page">
        <aside className="sidebar">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`menu-item ${item.name === '搞钱' ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </div>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '12px 0' }} />
          <div className="tag-note">搞钱中心</div>
          {subItems.map((item, index) => (
            <div
              key={item}
              className={`menu-item ${index === 0 ? 'active' : ''}`}
            >
              {item}
            </div>
          ))}
        </aside>
        <main className="content">
          <div className="page-search">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="搜索商品名称、品类..." />
          </div>
          <div className="filter-section">
            <div className="filter-row">
              <div className="filter-label">分类:</div>
              <div className="pill active">全部</div>
              <div className="pill">家居</div>
              <div className="pill">数码</div>
              <div className="pill">食品</div>
              <div className="pill">美妆</div>
            </div>
            <div className="filter-row">
              <div className="filter-label">排序:</div>
              <div className="pill active">综合</div>
              <div className="pill">高佣</div>
              <div className="pill">高销量</div>
            </div>
          </div>
          <div className="card">
            <h4>夏季轻薄防晒外套（女款）</h4>
            <div className="meta">券后价 ¥89 · 月销 2.3w</div>
            <div className="row">
              <span className="tag">佣金比 18%</span>
              <span className="tag">预估佣金 ¥16.02/单</span>
            </div>
            <div className="row" style={{ marginTop: '10px' }}>
              <button className="cta">生成推广链接</button>
              <span className="card-link">查看详情 →</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
