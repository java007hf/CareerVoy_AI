import { posts } from '../data/mock-posts';
import Post from './Post';

export default function Feed() {
  return (
    <>
      <div className="page-search">
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="搜索帖子内容..." />
      </div>
      <div className="pill-row">
        <div className="pill active">推荐</div>
        <div className="pill">最新</div>
        <div className="pill">关注</div>
      </div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}
