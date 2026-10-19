# 个人展示网站 · AI 代理开发规范（AGENTS）

> 本文档面向参与本项目开发的 AI 代理与协作者，是所有代码产出必须遵守的规范。开始任何开发前请先完整阅读。

---

## 1. 项目概述

个人展示网站（纯前端静态站点），包含模块：个人介绍、技能展示、项目展示、博客、联系。

- **技术栈（固定，不可更改）**：React + TypeScript + Vite + Tailwind CSS。
- **博客**：本地 Markdown 文件，`react-markdown` + `remark-gfm` + `rehype-pretty-code` 渲染，支持代码高亮与 TOC 目录。
- **星空背景**：Canvas 2D 实现，缓慢闪烁 + 视差。
- **数据**：本地 JSON（个人信息/技能/项目）+ Markdown（博客），无后端、无数据库。
- **设计基调**：深色主题、简洁现代、多端自适应。

详细需求见 `docs/PRD.md`，技术方案见 `docs/TECH_DESIGN.md`。**两者冲突时以 PRD 为准。**

---

## 2. 开发规范

### 2.1 命名规范

| 对象 | 规范 | 示例 |
| --- | --- | --- |
| 组件文件 | PascalCase `.tsx` | `Navbar.tsx`、`SkillBar.tsx` |
| 组件名 | PascalCase | `function Navbar() {}` |
| Hooks | camelCase，`use` 前缀 | `useStarField`、`useReducedMotion` |
| 工具函数/文件 | camelCase `.ts` | `posts.ts`、`clipboard.ts` |
| 常量/配置 | UPPER_SNAKE_CASE 或对象 | `ACCENT_COLOR` |
| CSS 类 | 优先 Tailwind 工具类；自定义类用 kebab-case | `.star-field` |
| 类型/接口 | PascalCase，接口不加 `I` 前缀 | `interface Project {}` |
| 数据字段 | camelCase | `readingTime`、`coverUrl` |

### 2.2 组件拆分规范

- **单一职责**：一个组件只做一件事；超过 ~200 行需考虑拆分。
- 拆分粒度：
  - `layout/`：全局布局（导航、页脚）。
  - `ui/`：纯展示、无业务逻辑、可复用的原子组件（Button、Tag、Section、SkillBar）。
  - `sections/`：首页各业务模块（Hero、About、Skills、Projects、Contact）。
  - `pages/`：路由页面，负责组装 section / 拉取数据。
  - `StarField/`：星空背景（含其专属逻辑）。
- **复用优先**：重复出现的 UI 抽到 `ui/`，禁止在多个 section 中重复实现同一视觉元素。
- 样式写在组件内（Tailwind 类），跨组件复用的复杂样式抽到 `index.css` 的 `@layer components`。

### 2.3 文件组织

- 目录结构严格遵循 `docs/TECH_DESIGN.md` 第 2 节，新增文件放到对应分类目录。
- 数据文件（JSON/Markdown）与业务逻辑代码分离，代码不硬编码展示内容。
- 新增博客文章仅需在 `src/content/posts/` 添加 `.md` 文件，**禁止修改任何代码**。

---

## 3. 代码风格要求

### 3.1 TypeScript 严格

- `tsconfig.json` 开启 `"strict": true`。
- 禁止 `any`；确实无法推断时用 `unknown` 并收窄。
- 所有数据模型在对应类型中定义（见 TECH_DESIGN 第 3 节），JSON 数据用类型断言并保证与接口一致。
- 函数组件显式标注返回类型 `JSX.Element`（或省略由推断，但 props 必须类型化）。
- Props 用 `interface` 定义，导出以便复用。

### 3.2 函数式组件

- 一律使用**函数式组件 + Hooks**，禁止 Class 组件。
- 组件内 hooks 顺序稳定，不自建条件调用 hooks。
- 副作用统一用 `useEffect` + 清理函数；定时器/RAF/listener 必须在 cleanup 中释放。

### 3.3 注释规范

- 复杂算法（如星空粒子运动、TOC 提取）加**块注释**说明思路。
- 公共组件 / Hooks / 工具函数加 **JSDoc** 注释，说明用途与参数。
- 不写无意义注释（如 `// 定义变量 x`）；用代码自解释 + 关键处注释。
- TODO/FIXME 需标注原因，不遗留无说明的 TODO。

### 3.4 其他

- 使用 `const`/`let`，不用 `var`；优先解构、可选链、空值合并。
- 保持单一出口的 `return`，减少深层嵌套。
- 格式化遵循项目 ESLint/Prettier 配置（如引入）。

---

## 4. UI / 样式规范

严格遵守 PRD 第 4 节设计要点：

- **颜色**：背景 `#0B0F1A`，文字主色 `#E6EAF2`，强调色**从 `src/config/theme.ts` 读取，禁止在组件里硬编码强调色**。
- **圆角**：卡片 16px，按钮/标签 12px。
- **留白**：section 间充足留白，内容最大宽度 **1200px**，水平居中。
- **缓动**：统一使用全局 `--ease: cubic-bezier(0.4, 0, 0.2, 1)`，过渡 200~300ms。
- **响应式**：单列 → 两列 → 三列（`sm` / `lg` 断点），使用 Tailwind 响应式前缀。
- **对比度**：正文 ≥ 4.5:1（WCAG AA），不因深色主题降低可读性。
- 所有颜色/圆角/间距若可复用，优先走主题变量或 Tailwind 配置，不写死魔法数字。

---

## 5. 测试要求

### 5.1 多端适配测试

- 至少覆盖三档视口：**375px（手机）/ 768px（平板）/ 1440px（桌面）**。
- 验收硬指标：375px 下 `scrollWidth ≤ clientWidth`（无横向滚动）。
- 断点切换（单/两/三列）在各档正确；汉堡菜单在 < 640px 正常展开/收起。

### 5.2 动画性能测试

- 移动端星空粒子帧率 ≥ 50fps（用 RAF 计数或 Performance 面板测量）。
- `prefers-reduced-motion` 开启时动画减弱或停止（用 DevTools 模拟验证）。
- 页面隐藏后 RAF 停止，恢复后继续，无内存泄漏。

### 5.3 功能测试

- 复制邮箱点击后有"已复制"反馈。
- 联系表单：空值/邮箱格式错误提示；提交成功/失败均有明确反馈。
- 博客列表自动读取新增 md；详情页 TOC 可跳转、代码高亮正确。
- 键盘 Tab 可遍历交互元素，焦点样式可见。

---

## 6. 注意事项（开发红线）

1. **星空性能优先**：粒子用 Canvas 而非 DOM；数量随设备自适应；严格按 TECH_DESIGN 4.1 优化，禁止为效果牺牲帧率。
2. **无障碍**：所有 `<img>` 必须有描述性 `alt`；交互元素语义化（按钮用 `<button>`，链接用 `<a>`）；颜色对比度达标；支持键盘导航。
3. **无横向滚动**：`html, body` 设 `overflow-x: hidden`；图片/代码块/Canvas 不撑破页面；禁止负 margin 造成溢出。
4. **强调色集中配置**：不要在组件里写死颜色，统一走 `theme.ts` / Tailwind `@theme`。
5. **新增博客零代码**：加 `.md` 文件即可，不改代码。
6. **不引入后端**：本项目是静态站点，禁止引入服务器、数据库；联系表单用第三方表单服务或 `mailto:` 兜底。
7. **数据与代码分离**：展示内容放 JSON/Markdown，代码只负责渲染与交互。
8. **遵循既定目录结构**：新增文件放入对应分类目录，避免随意堆在 `src/` 根目录。
