import { useState } from 'react';
import Feed from '../components/Feed';
import CommunitySidebar from '../components/CommunitySidebar';
import Modal from '../components/Modal';
import PostForm from '../components/PostForm';

export default function CommunityPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="screen">
        <div className="screen-head">
          <div>
            <div className="screen-title">社区 · 推荐</div>
            <div className="screen-sub">今天有什么新动态？</div>
          </div>
          <button className="cta" onClick={() => setModalOpen(true)}>
            发布帖子
          </button>
        </div>

        <div className="page">
          <aside className="sidebar">
            <CommunitySidebar />
          </aside>
          <main className="content">
            <Feed />
          </main>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <PostForm onClose={() => setModalOpen(false)} />
      </Modal>
    </>
  );
}
