import { useNavigate } from 'react-router-dom';

export default function MessagesPage() {
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
        <div className="screen-title">消息中心</div>
      </div>
      <div className="page">
        <aside className="sidebar">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className={`menu-item ${item.name === '消息' ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </div>
          ))}
        </aside>
        <main className="content">
          <div className="tabs">
            <div className="tab active">互动消息 <span style={{ color: 'var(--primary)' }}>12</span></div>
            <div className="tab">系统通知</div>
            <div className="tab">带货通知 <span style={{ color: 'var(--primary)' }}>3</span></div>
          </div>
          <div className="msg-item">
            <div className="msg-avatar"></div>
            <div className="msg-content">
              <div className="msg-title">王大牛 赞了你的帖子</div>
              <div className="msg-preview">《失业第30天，我学会了和焦虑共处》</div>
            </div>
            <div>
              <div className="msg-time">2小时前</div>
              <div style={{ textAlign: 'right', marginTop: '4px' }}>
                <span className="msg-dot"></span>
              </div>
            </div>
          </div>
          <div className="msg-item">
            <div className="msg-avatar"></div>
            <div className="msg-content">
              <div className="msg-title">莉莉 评论了你的帖子</div>
              <div className="msg-preview">感谢分享，对我帮助很大！</div>
            </div>
            <div className="msg-time">5小时前</div>
          </div>
          <div className="msg-item">
            <div className="msg-avatar"></div>
            <div className="msg-content">
              <div className="msg-title">赚钱队长小明 关注了你</div>
              <div className="msg-preview">你们有 3 位共同关注</div>
            </div>
            <div className="msg-time">昨天</div>
          </div>
        </main>
      </div>
    </div>
  );
}
