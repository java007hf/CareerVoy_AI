export default function CommunitySidebar() {
  const menuItems = ['社区', '搞钱', '消息', '我的'];
  const tags = ['实用信息', '情绪共鸣', '盈利相关', '同城互助'];

  return (
    <>
      {menuItems.map((item, index) => (
        <div 
          key={item}
          className={`menu-item ${index === 0 ? 'active' : ''}`}
        >
          {item}
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
