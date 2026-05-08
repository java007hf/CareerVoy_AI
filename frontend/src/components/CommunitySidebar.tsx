import { useNavigate, useLocation } from 'react-router-dom';

export default function CommunitySidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    { name: '社区', path: '/community' },
    { name: '搞钱', path: '/money' },
    { name: '消息', path: '/messages' },
    { name: '我的', path: '/profile' },
  ];
  const tags = ['实用信息', '情绪共鸣', '盈利相关', '同城互助'];

  return (
    <>
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => navigate(item.path)}
        >
          {item.name}
        </div>
      ))}
      <hr style={{border: 'none', borderTop: '1px solid var(--line)', margin: '12px 0'}} />
      <div className="tag-note">核心内容分类</div>
      <div className="capsule-tags">
        {tags.map((tag, index) => (
          <div
            key={tag}
            className={`capsule-tag ${index === 0 ? 'active' : ''}`}
          >
            {tag}
          </div>
        ))}
      </div>
    </>
  );
}
