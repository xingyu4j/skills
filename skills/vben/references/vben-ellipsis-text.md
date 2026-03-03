---
name: vben-ellipsis-text
description: Vben EllipsisText 省略文本组件，支持超长省略、tooltip 提示、展开收起功能。
---

# Vben EllipsisText 省略文本

文本展示组件，可配置超长省略、tooltip 提示、展开收起等功能。

## 基础用法

```vue
<template>
  <!-- 单行省略 -->
  <EllipsisText :max-width="200">
    这是一段很长很长的文本内容...
  </EllipsisText>

  <!-- 多行折叠 -->
  <EllipsisText :line="3" expand>
    这是一段很长很长的文本内容...
  </EllipsisText>

  <!-- 仅省略时显示 tooltip -->
  <EllipsisText tooltip-when-ellipsis>
    这是一段文本内容
  </EllipsisText>
</template>
```

## Props

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expand | 支持点击展开或收起 | `boolean` | `false` |
| line | 文本最大行数 | `number` | `1` |
| maxWidth | 文本区域最大宽度 | `number \| string` | `'100%'` |
| placement | 提示浮层的位置 | `'bottom' \| 'left' \| 'right' \| 'top'` | `'top'` |
| tooltip | 启用文本提示 | `boolean` | `true` |
| tooltipWhenEllipsis | 内容超出时自动启用文本提示 | `boolean` | `false` |
| ellipsisThreshold | 文本截断检测的像素差异阈值 | `number` | `3` |
| tooltipBackgroundColor | 提示文本背景颜色 | `string` | - |
| tooltipColor | 提示文本颜色 | `string` | - |
| tooltipFontSize | 提示文本大小 | `string` | - |
| tooltipMaxWidth | 提示浮层最大宽度 | `number` | - |
| tooltipOverlayStyle | 提示框内容区域样式 | `CSSProperties` | `{ textAlign: 'justify' }` |

## Events

| 事件名 | 描述 | 类型 |
| --- | --- | --- |
| expandChange | 展开状态改变 | `(isExpand:boolean)=>void` |

## Slots

| 插槽名 | 描述 |
| --- | --- |
| tooltip | 启用文本提示时，用来定制提示内容 |
