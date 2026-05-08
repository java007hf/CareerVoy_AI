# CareerVoy AI - 后端 API 设计文档

> **创建时间：** 2026-05-08
> **状态：** 仅 API 设计阶段
> **技术栈：** Node.js + Express + MongoDB + JWT

---

## 1. 概述

### 1.1 设计目标

为 CareerVoy AI 提供完整的后端 API，支持社区发帖/浏览、点赞评论、用户认证、搞钱选品展示等核心功能。

### 1.2 技术选型

| 组件 | 选择 | 说明 |
|------|------|------|
| Runtime | Node.js 18+ | LTS 版本 |
| Framework | Express.js | 成熟稳定 |
| Database | MongoDB | Mongoose ODM |
| Auth | JWT | jsonwebtoken |
| Validation | Zod | 类型安全的参数校验 |

---

## 2. 数据模型

### 2.1 User（用户）

```typescript
interface User {
  _id: ObjectId;
  phone: string;              // 手机号（唯一）
  wechatOpenId?: string;       // 微信 OpenID（唯一）
  nickname: string;            // 昵称
  avatar?: string;             // 头像 URL
  bio?: string;                // 个人说明
  location?: string;           // IP属地
  level: number;               // 等级
  levelTitle: string;          // 等级称号
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.2 Post（帖子）

```typescript
interface Post {
  _id: ObjectId;
  authorId: ObjectId;         // 作者 ID（ref: User）
  title?: string;              // 标题（可选）
  content: string;             // 正文内容
  images: string[];            // 图片 URL 列表
  category: '实用信息' | '情绪共鸣' | '盈利相关' | '同城互助';
  status: 'pending' | 'approved' | 'rejected';  // 审核状态
  likes: number;               // 点赞数
  comments: number;             // 评论数
  collects: number;             // 收藏数
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.3 Comment（评论）

```typescript
interface Comment {
  _id: ObjectId;
  postId: ObjectId;           // 帖子 ID（ref: Post）
  authorId: ObjectId;          // 评论者 ID（ref: User）
  content: string;             // 评论内容
  parentId?: ObjectId;         // 父评论 ID（用于回复）
  likes: number;               // 点赞数
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.4 Product（商品）

```typescript
interface Product {
  _id: ObjectId;
  taobaoItemId: string;       // 淘宝商品 ID（关联淘宝联盟）
  title: string;              // 商品标题
  description: string;         // 商品描述
  images: string[];            // 图片列表
  originalPrice: number;       // 原价
  discountedPrice: number;     // 券后价
  commissionRate: number;       // 佣金比例（0.18 表示 18%）
  estimatedCommission: number;  // 预估佣金
  monthlySales: number;       // 月销量
  category: string;            // 分类：家居/数码/食品/美妆
  conversionRate?: number;    // 转化率（来自战报）
  verifiedReports?: number;    // 认证战报数
  status: 'active' | 'inactive';
  lastSyncAt: Date;           // 最后同步时间
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.5 Promotion（推广记录）

```typescript
interface Promotion {
  _id: ObjectId;
  userId: ObjectId;           // 推广用户 ID
  productId: ObjectId;          // 商品 ID（ref: Product）
  taobaoPid: string;            // 用户的推广位 PID
  link: string;                // 推广链接
  coupon: string;              // 推广口令
  clicks: number;              // 点击数
  orders: number;               // 订单数
  estimatedCommission: number; // 预估佣金（用户85%部分）
  platformFee: number;         // 平台服务费（15%部分）
  status: 'active' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.6 Income（收益记录）

```typescript
interface Income {
  _id: ObjectId;
  userId: ObjectId;
  type: 'estimated' | 'valid' | 'withdrawable' | 'withdrawn';
  amount: number;              // 原始佣金（淘宝联盟公布）
  userShare: number;            // 用户分成（85%）
  platformFee: number;          // 平台服务费（15%）
  source: 'commission' | 'refund';
  orderId?: string;             // 关联订单 ID
  promotionId?: ObjectId;       // 关联推广记录
  status: 'pending' | 'confirmed' | 'withdrawn';
  createdAt: Date;
  updatedAt: Date;
}
```

### 2.7 WithdrawRecord（提现记录）

```typescript
interface WithdrawRecord {
  _id: ObjectId;
  userId: ObjectId;
  amount: number;               // 提现金额
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  bankInfo?: string;            // 银行信息（脱敏）
  processedAt?: Date;           // 处理时间
  createdAt: Date;
}
```

---

## 3. API 规范

### 3.1 基础信息

**Base URL:** `http://localhost:3000/api`

**认证方式:** 除登录/注册外，所有接口需要携带 JWT Token

```
Authorization: Bearer <token>
```

**通用响应格式:**

```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功"
}
```

**错误响应:**

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  }
}
```

---

## 4. 接口列表

### 4.1 认证模块 `/auth`

#### POST /auth/send-code
发送手机验证码

**Request:**
```json
{
  "phone": "13800138000"
}
```

**Response:**
```json
{
  "success": true,
  "data": { "code": "123456" },  // 开发环境直接返回，生产环境发短信
  "message": "验证码已发送"
}
```

#### POST /auth/login
手机号登录

**Request:**
```json
{
  "phone": "13800138000",
  "code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "user": {
      "_id": "...",
      "phone": "13800138000",
      "nickname": "新用户",
      "avatar": null,
      "level": 1,
      "levelTitle": "Lv.1 新手"
    }
  }
}
```

#### POST /auth/wechat-login
微信登录（预留接口）

**Request:**
```json
{
  "code": "微信授权code"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "...",
    "user": { ... }
  }
}
```

---

### 4.2 用户模块 `/users`

#### GET /users/me
获取当前用户信息

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "phone": "13800138000",
    "nickname": "快乐小咸鱼",
    "avatar": "https://...",
    "bio": "失业不可怕，我们一起慢慢来~",
    "location": "上海",
    "level": 3,
    "levelTitle": "LV.3 摸鱼大师",
    "stats": {
      "following": 128,
      "followers": 2300,
      "likes": 56,
      "posts": 12
    }
  }
}
```

#### PATCH /users/me
更新个人信息

**Request:**
```json
{
  "nickname": "快乐小咸鱼",
  "avatar": "https://...",
  "bio": "新的个人说明",
  "location": "北京"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... },
  "message": "更新成功"
}
```

#### GET /users/:id
获取他人用户信息

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "nickname": "王大牛",
    "avatar": "https://...",
    "bio": "专注失业政策解读",
    "location": "北京",
    "level": 5,
    "levelTitle": "审核专家",
    "stats": {
      "following": 89,
      "followers": 8500,
      "likes": 12000,
      "posts": 86
    },
    "isFollowing": false
  }
}
```

#### POST /users/:id/follow
关注用户

**Response:**
```json
{
  "success": true,
  "message": "关注成功"
}
```

#### DELETE /users/:id/follow
取消关注

**Response:**
```json
{
  "success": true,
  "message": "已取消关注"
}
```

---

### 4.3 帖子模块 `/posts`

#### POST /posts
发布帖子

**Request:**
```json
{
  "title": "2026年失业金领取全流程（最新版）",
  "content": "很多伙伴不知道今年政策微调了...",
  "images": ["https://...", "https://..."],
  "category": "实用信息"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "2026年失业金领取全流程（最新版）",
    "content": "很多伙伴不知道今年政策微调了...",
    "images": ["https://..."],
    "category": "实用信息",
    "author": {
      "_id": "...",
      "nickname": "王大牛",
      "avatar": "https://..."
    },
    "status": "approved",
    "likes": 0,
    "comments": 0,
    "collects": 0,
    "createdAt": "2026-05-08T..."
  }
}
```

#### GET /posts
获取帖子列表

**Query Parameters:**
| 参数 | 类型 | 说明 |
|------|------|------|
| tab | string | `recommend`/`latest`/`following` |
| category | string | 分类筛选（可选） |
| page | number | 页码（默认 1） |
| limit | number | 每页数量（默认 20） |

**Response:**
```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "_id": "...",
        "title": "...",
        "content": "...",
        "images": [...],
        "category": "实用信息",
        "author": {
          "_id": "...",
          "nickname": "王大牛",
          "avatar": "https://..."
        },
        "likes": 2400,
        "comments": 456,
        "collects": 1100,
        "isLiked": false,
        "isCollected": false,
        "createdAt": "2026-05-08T..."
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8
    }
  }
}
```

#### GET /posts/:id
获取帖子详情

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "...",
    "content": "...",
    "images": [...],
    "category": "实用信息",
    "author": { ... },
    "likes": 2400,
    "comments": 456,
    "collects": 1100,
    "isLiked": true,
    "isCollected": false,
    "createdAt": "..."
  }
}
```

#### POST /posts/:id/like
点赞帖子

**Response:**
```json
{
  "success": true,
  "data": { "likes": 2401 }
}
```

#### DELETE /posts/:id/like
取消点赞

**Response:**
```json
{
  "success": true,
  "data": { "likes": 2400 }
}
```

#### POST /posts/:id/collect
收藏帖子

**Response:**
```json
{
  "success": true,
  "data": { "collects": 1101 }
}
```

#### DELETE /posts/:id/collect
取消收藏

**Response:**
```json
{
  "success": true,
  "data": { "collects": 1100 }
}
```

#### DELETE /posts/:id
删除帖子

**Response:**
```json
{
  "success": true,
  "message": "删除成功"
}
```

---

### 4.4 评论模块 `/posts/:postId/comments`

#### GET /posts/:postId/comments
获取评论列表

**Query Parameters:**
| 参数 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| limit | number | 每页数量 |

**Response:**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "_id": "...",
        "author": {
          "_id": "...",
          "nickname": "小明",
          "avatar": "https://..."
        },
        "content": "感谢楼主！",
        "likes": 128,
        "isLiked": false,
        "replies": [
          {
            "_id": "...",
            "author": { ... },
            "content": "加油！有问题随时问~",
            "likes": 32,
            "parentId": "...",
            "createdAt": "..."
          }
        ],
        "createdAt": "..."
      }
    ],
    "pagination": { ... }
  }
}
```

#### POST /posts/:postId/comments
发表评论

**Request:**
```json
{
  "content": "感谢楼主，终于搞明白了！",
  "parentId": "..."  // 可选，回复评论
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "content": "感谢楼主，终于搞明白了！",
    "author": { ... },
    "likes": 0,
    "createdAt": "..."
  }
}
```

#### POST /comments/:id/like
点赞评论

**Response:**
```json
{
  "success": true,
  "data": { "likes": 129 }
}
```

#### DELETE /comments/:id/like
取消评论点赞

**Response:**
```json
{
  "success": true,
  "data": { "likes": 128 }
}
```

---

### 4.5 商品模块 `/products`

#### GET /products
获取商品列表（选品广场）

**Query Parameters:**
| 参数 | 类型 | 说明 |
|------|------|------|
| search | string | 搜索关键词 |
| category | string | 分类筛选 |
| sort | string | 排序：`default`/`high佣金`/`highSales` |
| page | number | 页码 |
| limit | number | 每页数量 |

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "_id": "...",
        "title": "夏季轻薄防晒外套（女款）",
        "images": ["https://..."],
        "originalPrice": 159,
        "discountedPrice": 89,
        "commissionRate": 0.18,
        "estimatedCommission": 16.02,
        "monthlySales": 23000,
        "category": "服装"
      }
    ],
    "pagination": { ... }
  }
}
```

#### GET /products/:id
获取商品详情

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "taobaoItemId": "123456789",
    "title": "夏季轻薄防晒外套（女款）",
    "images": [...],
    "originalPrice": 159,
    "discountedPrice": 89,
    "commissionRate": 0.18,
    "estimatedCommission": 16.02,
    "monthlySales": 23000,
    "category": "服装",
    "description": "UPF50+防晒...",
    "conversionRate": 0.048,
    "verifiedReports": 128
  }
}
```

#### POST /products/:id/promote
生成推广链接（核心接口）

**说明：** 调用淘宝联盟 API 生成推广链接，按 85%/15% 分离佣金

**Response:**
```json
{
  "success": true,
  "data": {
    "promotionId": "...",
    "link": "https://s.click.taobao.com/...",
    "coupon": "口令 xyz",
    "commissionRate": 0.18,
    "estimatedCommission": 16.02,
    "userShare": 13.67,
    "platformFee": 2.35,
    "createdAt": "..."
  }
}
```

---

### 4.6 推广模块 `/promotions`

#### GET /promotions
获取我的推广列表

**Query Parameters:**
| 参数 | 类型 | 说明 |
|------|------|------|
| page | number | 页码 |
| limit | number | 每页数量 |

**Response:**
```json
{
  "success": true,
  "data": {
    "promotions": [
      {
        "_id": "...",
        "product": { ... },
        "link": "https://...",
        "clicks": 156,
        "orders": 23,
        "estimatedCommission": 298.46,
        "createdAt": "..."
      }
    ],
    "pagination": { ... }
  }
}
```

---

### 4.7 收益模块 `/income`

#### GET /income/summary
获取收益汇总（含分成信息）

**Response:**
```json
{
  "success": true,
  "data": {
    "monthEstimated": 1280,
    "monthUserShare": 1088,       // 用户可得（85%）
    "monthPlatformFee": 192,     // 平台服务费（15%）
    "lastMonthSettled": 850,
    "withdrawable": 320,
    "totalEarned": 5230
  }
}
```

#### GET /income/details
获取收益明细

**Query Parameters:**
| 参数 | 类型 | 说明 |
|------|------|------|
| type | string | `estimated`/`valid`/`withdrawable`/`withdrawn` |
| page | number | 页码 |
| limit | number | 每页数量 |

**Response:**
```json
{
  "success": true,
  "data": {
    "records": [
      {
        "_id": "...",
        "type": "estimated",
        "amount": 16.02,
        "source": "commission",
        "orderId": "Tbao20260508001",
        "product": {
          "title": "夏季轻薄防晒外套"
        },
        "status": "pending",
        "createdAt": "2026-05-08T..."
      }
    ],
    "pagination": { ... }
  }
}
```

#### POST /income/withdraw
申请提现

**Request:**
```json
{
  "amount": 300
}
```

**Response:**
```json
{
  "success": true,
  "message": "提现申请已提交"
}
```

#### GET /income/withdraw-records
获取提现记录

**Response:**
```json
{
  "success": true,
  "data": {
    "records": [
      {
        "_id": "...",
        "amount": 300,
        "status": "processing",
        "createdAt": "2026-05-01T..."
      }
    ]
  }
}
```

---

### 4.8 消息模块 `/messages`

#### GET /messages
获取消息列表

**Query Parameters:**
| 参数 | 类型 | 说明 |
|------|------|------|
| type | string | `interaction`/`system`/`promotion` |
| page | number | 页码 |
| limit | number | 每页数量 |

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "_id": "...",
        "type": "interaction",
        "title": "王大牛 赞了你的帖子",
        "preview": "《失业金领取...》",
        "isRead": false,
        "relatedId": "...",
        "createdAt": "2小时前"
      }
    ],
    "pagination": { ... },
    "unreadCounts": {
      "interaction": 12,
      "system": 3,
      "promotion": 1
    }
  }
}
```

#### PATCH /messages/:id/read
标记消息已读

**Response:**
```json
{
  "success": true,
  "message": "已标记"
}
```

---

## 5. 错误码规范

| 错误码 | HTTP状态码 | 说明 |
|--------|------------|------|
| INVALID_PARAMS | 400 | 参数错误 |
| UNAUTHORIZED | 401 | 未登录或 Token 失效 |
| FORBIDDEN | 403 | 无权限 |
| NOT_FOUND | 404 | 资源不存在 |
| SERVER_ERROR | 500 | 服务器内部错误 |

---

## 6. 分页规范

所有列表接口支持分页，使用 `page` 和 `limit` 参数：

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 156,
      "totalPages": 8
    }
  }
}
```

---

## 7. 淘宝联盟对接方案

### 7.1 接入方式

**平台：** 淘宝联盟开放平台（阿里妈妈）

**接入流程：**
1. 申请淘宝联盟开发者资质
2. 获取 AppKey 和 AppSecret
3. 通过授权获取用户 PID（推广位）
4. 调用淘宝联盟 API 获取商品和订单数据

### 7.2 核心 API 映射

| 功能 | 淘宝联盟 API | 说明 |
|------|-------------|------|
| 商品查询 | `taobao.tbk.dg.optimus.material` | 选品池/超级分类API |
| 商品详情 | `taobao.tbk.item.info.get` | 商品基本信息 |
| 推广链接 | `taobao.tbk.link.gen` | 生成推广链接/口令 |
| 订单查询 | `taobao.tbk.order.get` | 订单回流数据 |
| 订单校验 | 平台认证战报 | 基于订单自动核验 |

### 7.3 数据同步机制

```typescript
// 商品同步任务（每日更新）
interface ProductSync {
  lastSyncAt: Date;          // 最后同步时间
  totalProducts: number;      // 总商品数
  syncStatus: 'idle' | 'running' | 'error';
}

// 订单回流（按日同步）
interface OrderSync {
  date: string;              // 订单日期
  orderCount: number;        // 订单数
  estimatedCommission: number; // 预估佣金
  syncStatus: 'pending' | 'completed';
}
```

### 7.4 用户推广链接生成流程

```
用户点击"生成推广链接"
       ↓
后端调用淘宝联盟 API
       ↓
返回推广链接 + 口令
       ↓
存储 Promotion 记录
       ↓
用户分享给其他人
       ↓
订单回流 → 计算佣金 → 更新收益
```

---

## 8. 收益分成方案

### 8.1 分成比例（已确认）

| 角色 | 比例 | 说明 |
|------|------|------|
| 用户分成 | 85% | 推广者获得 |
| 平台服务费 | 15% | 平台运营成本 |

**注意：** 分成比例后台可配置，为后续分层激励预留空间。

### 8.2 收益状态定义

| 状态 | 说明 | 可提现 |
|------|------|--------|
| estimated | 订单支付后预估，可能因退款/维权变化 | ❌ |
| valid | 通过有效性校验后确认 | ❌ |
| withdrawable | 达到结算周期且满足提现门槛（≥100元） | ✅ |
| withdrawn | 已提现完成 | - |

### 8.3 结算规则

- **结算周期：** 月结（每月 1 日结算上月）
- **提现门槛：** 100 元
- **退款/维权/无效订单：** 自动冲减对应预估收益

### 8.4 收益计算示例

```
用户推广成交一笔订单：
- 商品佣金：100 元
- 淘宝联盟收取：10 元（10%）
- 平台实收：90 元
- 用户分成（85%）：76.5 元
- 平台服务费（15%）：13.5 元
```

### 8.5 收益计算接口

```typescript
// 收益计算服务
interface CommissionCalculation {
  // 计算用户预估收益
  calculateEstimated(userId: string, orderAmount: number, commissionRate: number): number;

  // 计算用户实际可分成
  calculateUserShare(commission: number): {
    userShare: number;      // 85%
    platformFee: number;   // 15%
  };

  // 更新收益状态
  updateIncomeStatus(orderId: string, status: 'estimated' | 'valid' | 'withdrawable' | 'withdrawn'): void;
}
```

---

## 9. 后续工作

1. **实现阶段** - 根据本设计文档实现 API
2. **测试阶段** - 使用 Postman 或自动化测试验证接口
3. **联调阶段** - 与前端对接调试
