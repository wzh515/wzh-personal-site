---
title: 响应式布局实践
date: 2026-10-05
excerpt: 使用 Tailwind CSS 实现单列、两列、三列的自适应布局。
tags: [CSS, Tailwind, 响应式]
---

## 断点设计

- 小于 640px：单列布局
- 640px ~ 1024px：两列布局
- 大于 1024px：三列布局

## 实现方式

使用 Tailwind 的响应式前缀即可轻松实现：

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  <!-- 卡片 -->
</div>
```

## 注意事项

- 避免固定宽度，防止小屏出现横向滚动
- 为图片设置 `max-width: 100%`
- 测试 375px 视口下无横向滚动条
