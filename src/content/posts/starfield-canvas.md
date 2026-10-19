---
title: 用 Canvas 实现星空粒子背景
date: 2026-10-12
excerpt: 分享如何用 Canvas 2D 高效实现星空粒子背景，并针对移动端做性能优化。
tags: [Canvas, 性能优化, 前端]
---

## 背景

星空粒子背景可以提升页面的氛围感，但如果实现不当，容易在移动端造成卡顿。

## 核心思路

1. 使用单层 Canvas + `requestAnimationFrame` 统一渲染
2. 移动端自动减少粒子数量
3. 尊重 `prefers-reduced-motion` 减弱动画

## 示例代码

```js
function draw() {
  requestAnimationFrame(draw)
  ctx.clearRect(0, 0, width, height)
  // 遍历并绘制每一颗粒子...
}
```

## 性能对比

| 方案 | 桌面端帧率 | 移动端帧率 |
| --- | --- | --- |
| DOM 粒子 | 55fps | 30fps |
| Canvas 粒子 | 60fps | 55fps |

## 总结

在粒子数量较多时，Canvas 是性价比最高的方案。
