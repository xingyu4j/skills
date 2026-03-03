---
name: vben-drawer
description: Vben Drawer 抽屉组件，支持自动高度、loading 等功能。
---

# Vben Drawer 抽屉

框架提供的抽屉组件，支持自动高度、loading 等功能。

## 基础用法

使用 `useVbenDrawer` 创建抽屉：

```ts
const [Drawer, drawerApi] = useVbenDrawer({
  // 属性和事件
});
```

## 组件抽离

通过 `connectedComponent` 参数将内外组件连接，适用于复杂业务场景。

> **注意：** 使用 `connectedComponent` 时，如果内外同时设置了相同参数，以内部为准。`onOpenChange` 事件除外，内外都会触发。可配置 `destroyOnClose` 决定关闭时是否销毁组件。

## Props

所有属性都可以传入 `useVbenDrawer` 的第一个参数中。

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| appendToMain | 是否挂载到内容区域（默认挂载到 body） | `boolean` | `false` |
| connectedComponent | 连接另一个 Drawer 组件 | `Component` | - |
| destroyOnClose | 关闭时销毁 | `boolean` | `false` |
| title | 标题 | `string \| slot` | - |
| titleTooltip | 标题提示信息 | `string \| slot` | - |
| description | 描述信息 | `string \| slot` | - |
| isOpen | 打开状态 | `boolean` | `false` |
| loading | 加载状态 | `boolean` | `false` |
| closable | 显示关闭按钮 | `boolean` | `true` |
| closeIconPlacement | 关闭按钮位置 | `'left' \| 'right'` | `right` |
| modal | 显示遮罩 | `boolean` | `true` |
| header | 显示 header | `boolean` | `true` |
| footer | 显示 footer | `boolean \| slot` | `true` |
| confirmLoading | 确认按钮 loading 状态 | `boolean` | `false` |
| closeOnClickModal | 点击遮罩关闭 | `boolean` | `true` |
| closeOnPressEscape | ESC 关闭 | `boolean` | `true` |
| confirmText | 确认按钮文本 | `string \| slot` | `确认` |
| cancelText | 取消按钮文本 | `string \| slot` | `取消` |
| placement | 抽屉弹出位置 | `'left' \| 'right' \| 'top' \| 'bottom'` | `right` |
| showCancelButton | 显示取消按钮 | `boolean` | `true` |
| showConfirmButton | 显示确认按钮 | `boolean` | `true` |
| class | 抽屉的 class（宽度通过此配置） | `string` | - |
| contentClass | 内容区域 class | `string` | - |
| footerClass | 底部区域 class | `string` | - |
| headerClass | 顶部区域 class | `string` | - |
| zIndex | ZIndex 层级 | `number` | `1000` |
| overlayBlur | 遮罩模糊度 | `number` | - |

> `appendToMain` 可将抽屉挂载到内容区域，此时标签栏、导航菜单等不会被遮挡。需要 `Page` 组件设置 `auto-content-height` 属性。

## Events

| 事件名 | 描述 | 类型 |
| --- | --- | --- |
| onBeforeClose | 关闭前触发，返回 `false` 则禁止关闭 | `()=>boolean` |
| onCancel | 点击取消按钮触发 | `()=>void` |
| onClosed | 关闭动画播放完毕时触发 | `()=>void` |
| onConfirm | 点击确认按钮触发 | `()=>void` |
| onOpenChange | 关闭或打开时触发 | `(isOpen:boolean)=>void` |
| onOpened | 打开动画播放完毕时触发 | `()=>void` |

## Slots

| 插槽名 | 描述 |
| --- | --- |
| default | 默认插槽 - 内容 |
| prepend-footer | 取消按钮左侧 |
| center-footer | 取消按钮和确认按钮中间 |
| append-footer | 确认按钮右侧 |
| close-icon | 关闭按钮图标 |
| extra | 额外内容（标题右侧） |

## drawerApi

| 方法 | 描述 | 类型 |
| --- | --- | --- |
| setState | 动态设置状态属性 | `(((prev: ModalState) => Partial<ModalState>) \| Partial<ModalState>)=>drawerApi` |
| open | 打开抽屉 | `()=>void` |
| close | 关闭抽屉 | `()=>void` |
| setData | 设置共享数据 | `<T>(data:T)=>drawerApi` |
| getData | 获取共享数据 | `<T>()=>T` |
| useStore | 获取可响应式状态 | - |
| lock | 将抽屉标记为提交中，锁定当前状态 | `(isLock:boolean)=>drawerApi` |
| unlock | 解除锁定状态 | `()=>drawerApi` |

> `lock` 方法锁定抽屉状态：确认按钮变为 loading，禁用取消和关闭按钮，禁止 ESC/遮罩关闭，开启 spinner 动画。调用 `close` 会自动解锁。
