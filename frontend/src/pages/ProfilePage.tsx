import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const menuItems = [
    { name: '社区', path: '/community' },
    { name: '搞钱', path: '/money' },
    { name: '消息', path: '/messages' },
    { name: '我的', path: '/profile' },
  ];

  return (
    <div className="screen">
      <div className="screen-head">
        <div className="screen-title">我的</div>
      </div>
      <div className="page">
        <aside className="sidebar">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`menu-item ${item.name === '我的' ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </div>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '12px 0' }} />
          <div className="tag-note">快捷入口</div>
          <div className="menu-item">💰 带货收入</div>
          <div className="menu-item">💬 消息中心</div>
          <div className="menu-item">⚙️ 个人设置</div>
        </aside>
        <main className="content">
          <div className="profile-header">
            <div className="avatar" style={{ width: '64px', height: '64px' }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ margin: 0 }}>快乐小咸鱼</h3>
                <span className="tag">LV.3 摸鱼大师</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--sub)', margin: '4px 0 0' }}>IP属地：上海</p>
            </div>
            <button className="cta" style={{ marginLeft: 'auto' }}>编辑资料</button>
          </div>
          <div className="profile-bio">失业不可怕，我们一起慢慢来~ 专注副业探索，分享搞钱心得。</div>
          <div className="profile-stats">
            <div className="stat-item"><div className="stat-num">128</div><div className="stat-label">关注</div></div>
            <div className="stat-item"><div className="stat-num">2.3k</div><div className="stat-label">粉丝</div></div>
            <div className="stat-item"><div className="stat-num">56</div><div className="stat-label">获赞</div></div>
          </div>
          <div className="tabs">
            <div className="tab active">我的帖子</div>
            <div className="tab">我的收藏</div>
            <div className="tab">我的关注</div>
          </div>
          <div className="card">
            <h4>失业第30天，我学会了和焦虑共处</h4>
            <div className="meta">2小时前发布</div>
            <p style={{ fontSize: '13px', color: '#5e534a', lineHeight: '1.6' }}>不要责怪自己，是周期性的问题。今天在公园发呆了两个小时，发现春天真的好美。</p>
          </div>
        </main>
      </div>
    </div>
  );
}
