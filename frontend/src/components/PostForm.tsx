import { useState, useRef } from 'react';

interface PostFormProps {
  onClose: () => void;
}

const CATEGORIES = ['实用信息', '情绪共鸣', '盈利相关', '同城互助'];

export default function PostForm({ onClose }: PostFormProps) {
  const [category, setCategory] = useState('实用信息');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  const charCount = content.length;
  const maxChars = 2000;

  const handleAddImage = () => {
    // Placeholder for image upload - creates a sample image
    const newImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Crect fill='%23ffe0cc' width='80' height='80'/%3E%3Ctext x='40' y='45' text-anchor='middle' fill='%237e7268' font-size='12'%3E图片${images.length + 1}%3C/text%3E%3C/svg%3E`;
    setImages([...images, newImage]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handlePublish = () => {
    console.log('发布帖子:', { category, title, content, images });
    onClose();
  };

  const handleSaveDraft = () => {
    console.log('存草稿:', { category, title, content, images });
    onClose();
  };

  const handleContentInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerText);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="publish-modal-header">
        <h3>发布帖子</h3>
        <button className="publish-close" onClick={onClose}>✕</button>
      </div>

      {/* Body */}
      <div className="publish-modal-body">
        {/* 分类标签 */}
        <div className="publish-category">
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              className={`capsule-tag ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* 标题输入 */}
        <input
          type="text"
          className="publish-title-input"
          placeholder="添加标题会有更多赞哦~"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={50}
        />

        {/* 内容编辑区 */}
        <div className="publish-content-area">
          {/* 工具栏 */}
          <div className="publish-toolbar">
            <button className="publish-tool-btn" title="插入图片" onClick={handleAddImage}>🖼️</button>
            <button className="publish-tool-btn" title="加粗" onClick={() => document.execCommand('bold')}>B</button>
            <button className="publish-tool-btn" title="插入链接">🔗</button>
            <button className="publish-tool-btn" title="@提到">@</button>
          </div>

          {/* 可编辑div */}
          <div
            ref={editorRef}
            className="publish-editor"
            contentEditable
            data-placeholder="分享你的故事、经验或求助..."
            onInput={handleContentInput}
          />

          {/* 图片列表 */}
          <div className="publish-image-list">
            {images.map((img, index) => (
              <div key={index} className="publish-image-item">
                <img src={img} alt={`已上传图片${index + 1}`} />
                <span className="publish-image-remove" onClick={() => handleRemoveImage(index)}>✕</span>
              </div>
            ))}
            <div className="publish-image-item publish-image-add" onClick={handleAddImage}>+</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="publish-modal-footer">
        <div>
          <span className={`publish-char-count ${charCount > maxChars * 0.9 ? 'warn' : ''}`}>
            {charCount} / {maxChars} 字
          </span>
        </div>
        <div className="publish-actions">
          <button className="cta-secondary" onClick={handleSaveDraft}>存草稿</button>
          <button className="cta" onClick={handlePublish}>发布</button>
        </div>
      </div>
    </>
  );
}
