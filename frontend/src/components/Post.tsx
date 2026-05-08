import type { PostData } from '../data/mock-posts';

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  return (
    <article className="card">
      <h4>{post.content.substring(0, 20)}...</h4>
      <div className="meta">@{post.author.name} · {post.timestamp}</div>
      <p style={{fontSize: '13px', color: '#5e534a', lineHeight: 1.6}}>{post.content}</p>
      <div className="row">
        <span className="tag">实用信息</span>
        <span className="tag">#心态日记</span>
      </div>
      <div className="engage">
        <span>♡ {post.likes}</span>
        <span>💬 {post.comments}</span>
        <span>🔖 {Math.floor(post.comments / 2)}k</span>
      </div>
    </article>
  );
}
