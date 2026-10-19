# 个人展示网站 · 技术设计文档（TECH_DESIGN）

> 版本：v1.0　|　更新日期：2026-10-19

---

## 1. 技术栈选择

### 1.1 前端

| 类别 | 选型 | 说明 |
| --- | --- | --- |
| 框架 | **React 18+** | 函数式组件 + Hooks，生态成熟 |
| 语言 | **TypeScript**（严格模式 `strict: true`） | 类型安全，配合数据模型 |
| 构建工具 | **Vite** | 开发热更新快，静态构建产物 |
| 样式 | **Tailwind CSS v4** | 原子化 CSS，`@tailwindcss/vite` 插件集成，CSS 内 `@theme` 定义主题变量 |
| 路由 | **react-router-dom** | 单页多路由（博客详情、项目详情） |
| 图标 | **lucide-react**（或 `react-icons`） | 技能/社交/UI 图标 |

### 1.2 博客 / Markdown

| 类别 | 选型 | 说明 |
| --- | --- | --- |
| Markdown 渲染 | **react-markdown** | React 组件式渲染 Markdown |
| GFM 扩展 | **remark-gfm** | 支持表格、任务列表、删除线 |
| 代码高亮 | **rehype-pretty-code**（基于 Shiki） | 高质量代码高亮，主题可配置 |
| Frontmatter 解析 | **gray-matter** | 解析 md 文件的 YAML 元信息（标题/日期/标签/摘要） |
| 标题锚点/TOC | **github-slugger** + 自定义提取 | 为标题生成稳定 id，用于 TOC 跳转 |
| 文件自动读取 | Vite `import.meta.glob` | 构建期自动扫描 `content/posts/*.md`，零代码新增文章 |

### 1.3 后端与数据库

**本项目为静态站点，无后端服务器、无数据库。** 数据管理方式：

- **个人信息 / 技能 / 项目**：本地 JSON 文件（`src/data/*.json`），构建时打包。
- **博客文章**：本地 Markdown 文件（`src/content/posts/*.md`），Frontmatter 承载元信息。
- **联系表单**：静态站点无法直接收发邮件。采用两种可切换方案：
  1. **Formspree / Web3Forms** 等第三方表单服务（推荐，无需自建后端）；
  2. 降级为 `mailto:` 链接（兜底）。

> 说明：数据由站主直接编辑 JSON/Markdown 文件维护，无需 CMS；后续如需，可将数据迁移到 Headless CMS。

---

## 2. 项目目录结构

```
wzh-personal-site/
├── docs/                          # 项目文档
│   ├── PRD.md
│   ├── TECH_DESIGN.md
│   └── AGENTS.md
├── public/                        # 静态资源（原样拷贝到 dist）
│   ├── favicon.svg
│   ├── avatar.jpg                 # 头像
│   └── resume.pdf                 # 简历文件
├── src/
│   ├── main.tsx                   # 应用入口
│   ├── App.tsx                    # 路由 + 全局布局
│   ├── index.css                  # Tailwind 入口 + 全局主题/缓动/样式
│   ├── vite-env.d.ts
│   ├── config/
│   │   └── theme.ts               # 强调色等可配置项（单一配置源）
│   ├── data/                      # 本地数据
│   │   ├── profile.json           # 个人信息 + 经历 + 教育
│   │   ├── skills.json            # 技能分类
│   │   └── projects.json          # 项目列表
│   ├── content/
│   │   └── posts/                 # 博客 Markdown 文件
│   │       └── hello-world.md
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # 吸顶毛玻璃导航 + 汉堡菜单
│   │   │   └── Footer.tsx
│   │   ├── ui/                    # 通用原子组件
│   │   │   ├── Button.tsx
│   │   │   ├── Section.tsx        # 通用 section 容器（标题 + 留白）
│   │   │   ├── Tag.tsx
│   │   │   └── SkillBar.tsx       # 熟练度进度条
│   │   └── StarField/
│   │       └── StarField.tsx      # Canvas 星空粒子背景
│   ├── sections/                  # 首页各模块
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── pages/                     # 路由页面
│   │   ├── Home.tsx               # 组装所有 section
│   │   ├── ProjectDetail.tsx
│   │   ├── BlogList.tsx
│   │   └── BlogDetail.tsx
│   ├── hooks/
│   │   ├── useStarField.ts        # 星空粒子逻辑封装
│   │   └── useReducedMotion.ts    # 检测 prefers-reduced-motion
│   └── utils/
│       ├── posts.ts               # import.meta.glob + gray-matter 读取文章
│       ├── markdown.tsx           # react-markdown 渲染组件 + TOC 提取
│       └── clipboard.ts           # 复制到剪贴板
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── package.json
├── .gitignore
└── README.md
```

---

## 3. 数据模型

### 3.1 个人信息（`src/data/profile.json`）

```ts
interface Profile {
  name: string;                 // 姓名
  title: string;                // 个人头衔，如 "全栈工程师"
  tagline: string;              // 一句话简介
  avatar: string;               // 头像路径 "/avatar.jpg"
  email: string;                // 联系邮箱
  location: string;             // 所在地
  bio: string[];                // 个人简介（多段落）
  resume: string;               // 简历路径 "/resume.pdf"
  socials: Social[];            // 社交账号
  experience: TimelineItem[];   // 经历时间线
  education: TimelineItem[];    // 教育背景
}

interface Social {
  name: string;                 // "GitHub"
  url: string;
  icon: string;                 // 图标名（lucide 图标 key）
}

interface TimelineItem {
  id: string;
  period: string;               // "2022.06 - 至今"
  title: string;                // "高级前端工程师"
  org: string;                  // 公司 / 学校
  description: string;
  tags?: string[];
}
```

### 3.2 技能（`src/data/skills.json`）

```ts
interface Skills {
  groups: SkillGroup[];
}

interface SkillGroup {
  category: string;             // "前端开发"
  icon: string;                 // 分类图标
  skills: Skill[];
}

interface Skill {
  name: string;                 // "React"
  level: number;                // 熟练度 0~100
  icon?: string;                // 可选：单个技能图标
}
```

### 3.3 项目（`src/data/projects.json`）

```ts
interface Projects {
  items: Project[];
}

interface Project {
  id: string;                   // 唯一标识，用于详情页路由
  title: string;
  cover: string;                // 封面图路径
  description: string;          // 卡片简介
  tags: string[];               // 技术标签
  links: {
    demo?: string;              // 在线演示
    github?: string;            // 源码仓库
  };
  detail: string;               // 详情正文（Markdown 字符串或 md 文件路径）
}
```

### 3.4 博客文章（`src/content/posts/*.md`）

每篇文章文件头使用 **Frontmatter（YAML）** 定义元信息：

```markdown
---
title: 我的第一篇博客
date: 2026-10-19
excerpt: 这是一段摘要。
tags: [React, Vite, TypeScript]
---

## 正文标题

正文内容，支持代码块、表格等 GFM 语法。
```

对应类型：

```ts
interface Post {
  slug: string;        // 由文件名派生，如 "hello-world"
  title: string;
  date: string;        // ISO 日期，用于排序
  excerpt: string;
  tags: string[];
  content: string;     // Markdown 正文
  readingTime: number; // 阅读时长（分钟），由字数估算
}

// 目录节点（TOC）
interface TocItem {
  id: string;          // 标题锚点 id
  text: string;
  depth: number;       // 标题层级 2~6
}
```

---

## 4. 关键技术难点与解决方案

### 4.1 星空粒子 Canvas 性能优化

**难点**：粒子数量多、闪烁 + 视差导致高帧率动画压力大，移动端容易掉帧。

**方案**：
- 单层 Canvas + `requestAnimationFrame` 统一渲染，避免多层重绘。
- 粒子数量按屏幕面积与设备类型自适应：`devicePixelRatio`、移动端判断（UA / 视口宽度）、低端设备减半。
- 视差效果仅使用**少量分层偏移**（2~3 层），通过鼠标/滚动偏移量做线性平移，成本极低。
- `prefers-reduced-motion` 时停止漂移与闪烁。
- 页面不可见（`visibilitychange`）时暂停 RAF 循环。
- Canvas 尺寸限制在视口大小，避免整页大画布。

### 4.2 新增 Markdown 博客自动读取

**难点**：静态站点需要"新增文件即生效"，不能手写导入列表。

**方案**：Vite `import.meta.glob` 在构建期自动扫描目录：

```ts
// utils/posts.ts
const modules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;
```

- 每个文件以 `?raw` 读取原始文本，用 `gray-matter` 解析 frontmatter + 正文。
- `eager: true` 使列表在构建期静态生成，新增文件后重新构建即自动收录。
- 开发模式下 Vite 热更新会自动反映新增文件。

### 4.3 Markdown 渲染、代码高亮与 TOC

**方案**：
- `react-markdown` + `remark-gfm` 渲染正文。
- `rehype-pretty-code`（Shiki）做代码高亮，主题采用与深色 UI 一致的配色。
- TOC：用 `remark` 解析出标题节点（`unist-util-visit`），为每个标题用 `github-slugger` 生成稳定 id，构建 `TocItem[]`；渲染时给标题组件传入 `id`，TOC 链接 `#id` 跳转并配合 `scroll-margin-top` 抵消吸顶导航高度。

### 4.4 移动端无横向滚动

**方案**：
- 全局 `overflow-x: hidden`（`html, body`）。
- 所有固定宽度元素使用相对单位或 `max-width: 100%`。
- 图片/Canvas 用 `max-width: 100%`；代码块 `pre` 允许内部横向滚动但不撑破页面。
- 网格使用 Tailwind 响应式断点，避免负 margin 溢出。

### 4.5 吸顶毛玻璃导航

**方案**：`position: sticky; top: 0` + `backdrop-filter: blur(12px)` + `rgba` 半透明背景 + 底部细边框。移动端汉堡菜单用受控 `useState` 切换，展开后点击菜单项自动收起。

### 4.6 平滑滚动 + 锚点偏移

**方案**：CSS `scroll-behavior: smooth`；每个 section 设置 `scroll-margin-top: 80px`（导航高度补偿）；或使用 JS `scrollIntoView({ behavior: 'smooth', block: 'start' })` 并手动计算偏移。

---

## 5. 部署方案

打包产物为纯静态文件，可部署至任意静态托管平台。

### 5.1 构建

```bash
npm run build   # 产出到 dist/
```

### 5.2 部署到 Vercel

1. 将项目推送到 GitHub / GitLab 仓库。
2. 在 [vercel.com](https://vercel.com) 导入仓库。
3. 框架预设选择 **Vite**，构建命令 `npm run build`，输出目录 `dist`。
4. 无需额外配置；SPA 路由由 Vercel 自动处理（或配置 `vercel.json` 的 rewrite）。

### 5.3 部署到 Cloudflare Pages

1. 在 [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create Pages 导入仓库。
2. 构建命令 `npm run build`，输出目录 `dist`。
3. SPA 回退：配置 `_redirects` 文件（`public/_redirects`）：

```
/*    /index.html   200
```

### 5.4 注意事项

- 简历、头像等大文件建议走 CDN 或压缩，控制首屏体积。
- 联系表单若用 Formspree，需在 `theme.ts` 或环境变量 `VITE_FORM_ENDPOINT` 配置提交地址。
