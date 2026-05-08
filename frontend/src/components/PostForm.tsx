interface PostFormProps {
  onClose: () => void;
}

export default function PostForm({ onClose }: PostFormProps) {
  return (
    <div className="post-form">
      <h3 style={{ margin: '0 0 16px', fontSize: '18px' }}>创建新帖子</h3>
      <input type="text" placeholder="标题" className="form-input" />
      <textarea placeholder="分享你的想法..." className="form-textarea"></textarea>
      <div className="form-actions">
        {/* Placeholder for future actions like adding images */}
        <div></div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="cta-secondary" onClick={onClose}>取消</button>
          <button className="cta">发布</button>
        </div>
      </div>
    </div>
  );
}
