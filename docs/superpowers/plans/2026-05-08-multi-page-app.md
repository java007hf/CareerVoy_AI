# Multi-Page App Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将单页应用重构为多页应用，包含四个主要模块：社区、搞钱、消息、我的

**Architecture:** 使用 React Router 实现客户端路由，每个模块有独立页面。左则边栏作为一级导航，搞钱模块内部有二级导航。Modal 使用 React Portal 渲染到 body。

**Tech Stack:** React 19 + React Router v6 + Vite + CSS Modules

---

## File Structure

```
frontend/src/
├── main.tsx                          # 入口文件（更新路由）
├── App.tsx                           # 根组件（更新路由配置）
├── index.css                         # 全局样式
├── components/
│   ├── NavigationBar.tsx             # 顶部导航栏（已有）
│   ├── Modal.tsx                     # 弹窗组件（已有）
│   ├── PostForm.tsx                  # 发布帖子表单（已有）
│   ├── CommunitySidebar.tsx          # 社区侧边栏（已有）
│   ├── MoneySidebar.tsx              # 新增：搞钱侧边栏（二级导航）
│   └── Layout.tsx                    # 布局组件（更新）
├── pages/
│   ├── HomePage.tsx                  # 社区主页（已有，重命名自 CommunityPage）
│   ├── MoneyPage.tsx                 # 新增：搞钱主页
│   ├── MessagesPage.tsx             # 新增：消息中心
│   ├── ProfilePage.tsx              # 新增：个人主页
│   └── LoginPage.tsx                # 新增：登录页
```

---

## Task 1: 安装 React Router

**Files:**
- Modify: `frontend/package.json`
- Modify: `frontend/src/main.tsx`

- [ ] **Step 1: 安装 React Router**

Run: `cd /Users/bytedance/BitsStudioProjects/CareerVoy_AI/frontend && npm install react-router-dom`

Expected: npm 安装成功，package.json 添加 react-router-dom 依赖

- [ ] **Step 2: 更新 main.tsx 添加 BrowserRouter**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 3: 提交**

```bash
cd /Users/bytedance/BitsStudioProjects/CareerVoy_AI/frontend
git add package.json package-lock.json src/main.tsx
git commit -m "feat: add react-router-dom for multi-page routing"
```

---

## Task 2: 创建页面组件占位符

**Files:**
- Create: `frontend/src/pages/CommunityPage.tsx`
- Create: `frontend/src/pages/MoneyPage.tsx`
- Create: `frontend/src/pages/MessagesPage.tsx`
- Create: `frontend/src/pages/ProfilePage.tsx`
- Create: `frontend/src/pages/LoginPage.tsx`

- [ ] **Step 1: 创建 CommunityPage（基于现有 HomePage）**

```tsx
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
```

- [ ] **Step 2: 创建 MoneyPage**

```tsx
export default function MoneyPage() {
  return (
    <div className="screen">
      <div className="screen-head">
        <div className="screen-title">搞钱中心</div>
      </div>
      <div className="page">
        <aside className="sidebar">
          <div className="menu-item active">选品广场</div>
          <div className="menu-item">我的推广</div>
          <div className="menu-item">收益看板</div>
          <div className="menu-item">新手入门</div>
        </aside>
        <main className="content">
          <p style={{ color: 'var(--sub)', textAlign: 'center', marginTop: '40px' }}>
            选品广场 - 功能开发中
          </p>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建 MessagesPage**

```tsx
export default function MessagesPage() {
  return (
    <div className="screen">
      <div className="screen-head">
        <div className="screen-title">消息中心</div>
      </div>
      <div className="page">
        <aside className="sidebar">
          <div className="menu-item active">互动消息</div>
          <div className="menu-item">系统通知</div>
          <div className="menu-item">带货通知</div>
        </aside>
        <main className="content">
          <p style={{ color: 'var(--sub)', textAlign: 'center', marginTop: '40px' }}>
            消息列表 - 功能开发中
          </p>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: 创建 ProfilePage**

```tsx
export default function ProfilePage() {
  return (
    <div className="screen">
      <div className="screen-head">
        <div className="screen-title">我的</div>
      </div>
      <div className="page">
        <aside className="sidebar">
          <div className="menu-item">💰 带货收入</div>
          <div className="menu-item">💬 消息中心</div>
          <div className="menu-item">⚙️ 个人设置</div>
        </aside>
        <main className="content">
          <p style={{ color: 'var(--sub)', textAlign: 'center', marginTop: '40px' }}>
            个人主页 - 功能开发中
          </p>
        </main>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: 创建 LoginPage**

```tsx
export default function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-logo">CareerVoy AI</div>
      <div className="login-slogan">失业不孤单，副业有方向</div>
      <button className="login-btn login-phone">📱 手机号登录</button>
      <button className="login-wechat login-btn">💚 微信登录</button>
      <p style={{ fontSize: '12px', color: 'var(--sub)', marginTop: '16px' }}>
        登录即代表同意《用户协议》和《隐私政策》
      </p>
    </div>
  );
}
```

- [ ] **Step 6: 提交**

```bash
git add src/pages/CommunityPage.tsx src/pages/MoneyPage.tsx src/pages/MessagesPage.tsx src/pages/ProfilePage.tsx src/pages/LoginPage.tsx
git commit -m "feat: create page components for multi-page routing"
```

---

## Task 3: 更新 App.tsx 配置路由

**Files:**
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: 更新 App.tsx 配置路由**

```tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import CommunityPage from './pages/CommunityPage';
import MoneyPage from './pages/MoneyPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <>
      <NavigationBar />
      <div className="wrap">
        <Routes>
          <Route path="/" element={<Navigate to="/community" replace />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/money" element={<MoneyPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
```

- [ ] **Step 2: 提交**

```bash
git add src/App.tsx
git commit -m "feat: configure react-router routes for multi-page app"
```

---

## Task 4: 更新侧边栏添加导航链接

**Files:**
- Modify: `frontend/src/components/CommunitySidebar.tsx`

- [ ] **Step 1: 更新 CommunitySidebar 添加 Link**

```tsx
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
      <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '12px 0' }} />
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
```

- [ ] **Step 2: 提交**

```bash
git add src/components/CommunitySidebar.tsx
git commit -m "feat: add navigation links to sidebar"
```

---

## Task 5: 验证多页面路由

**Files:**
- 无文件变更

- [ ] **Step 1: 启动开发服务器**

Run: `cd /Users/bytedance/BitsStudioProjects/CareerVoy_AI/frontend && npm run dev`

Expected: 开发服务器启动，无报错

- [ ] **Step 2: 验证路由切换**

使用 Playwright 验证：
1. 访问 `http://localhost:5173/` → 应重定向到 `/community`
2. 点击侧边栏"搞钱" → 应跳转到 `/money` 页面
3. 点击侧边栏"消息" → 应跳转到 `/messages` 页面
4. 点击侧边栏"我的" → 应跳转到 `/profile` 页面

- [ ] **Step 3: 验证构建**

Run: `npm run build`

Expected: 构建成功，无报错

---

## Task 6: 更新 progress.md 并清理旧文件

**Files:**
- Modify: `frontend/src/components/HomePage.tsx`（删除，合并到 CommunityPage）
- Modify: `progress.md`

- [ ] **Step 1: 更新 progress.md**

在"已完成的任务"中添加：
- [x] 实现多页面路由架构（React Router）
- [x] 创建四个主要页面：社区/搞钱/消息/我的

- [ ] **Step 2: 可选删除 HomePage.tsx**（如果确认不需要）

Run: `rm frontend/src/components/HomePage.tsx`

---

## 验证清单

- [ ] 访问根路径 `/` 自动重定向到 `/community`
- [ ] 点击侧边栏导航可以切换到不同页面
- [ ] URL 地址栏随导航变化
- [ ] 页面刷新后保持在当前页面
- [ ] 开发服务器无报错
- [ ] 生产构建成功
