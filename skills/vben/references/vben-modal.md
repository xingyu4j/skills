---
name: vben-modal
description: Vben Modal 模态框组件，支持拖拽、全屏、自动高度、loading 等功能。
---

# Vben Modal 模态框

框架提供的模态框组件，支持拖拽、全屏、自动高度、loading 等功能。

## 基础用法

使用 `useVbenModal` 创建模态框：

```ts
const [Modal, modalApi] = useVbenModal({
  // 属性和事件
});
```

## 组件抽离

通过 `connectedComponent` 参数将内外组件连接，适用于复杂业务场景：

```vue
<script setup lang="ts">
import { useVbenModal } from '@vben/common-ui';
import EditModal from './modules/edit-modal.vue';

const [EditModalComp, editModalApi] = useVbenModal({
  connectedComponent: EditModal,
});

function handleOpen() {
  editModalApi.setData({ mode: 'edit', record: { id: '1' } }).open();
}
</script>

<template>
  <EditModalComp @success="handleSuccess" />
</template>
```

内部组件中接收数据：

```vue
<script setup lang="ts">
import { useVbenModal } from '@vben/common-ui';

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<{ mode: string; record?: any }>();
      // 使用 data 回填表单等
    }
  },
});
</script>

<template>
  <Modal title="编辑">
    <!-- 内容 -->
  </Modal>
</template>
```

> **注意：** 使用 `connectedComponent` 时，如果内外同时设置了相同参数，以内部为准。`onOpenChange` 事件除外，内外都会触发。设置了 `destroyOnClose` 时，内部组件会在关闭后完全销毁。

## Props

所有属性都可以传入 `useVbenModal` 的第一个参数中。

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| appendToMain | 是否挂载到内容区域（默认挂载到 body） | `boolean` | `false` |
| connectedComponent | 连接另一个 Modal 组件 | `Component` | - |
| destroyOnClose | 关闭时销毁 | `boolean` | `false` |
| title | 标题 | `string \| slot` | - |
| titleTooltip | 标题提示信息 | `string \| slot` | - |
| description | 描述信息 | `string \| slot` | - |
| isOpen | 弹窗打开状态 | `boolean` | `false` |
| loading | 弹窗加载状态 | `boolean` | `false` |
| fullscreen | 全屏显示 | `boolean` | `false` |
| fullscreenButton | 显示全屏按钮 | `boolean` | `true` |
| draggable | 可拖拽 | `boolean` | `false` |
| closable | 显示关闭按钮 | `boolean` | `true` |
| centered | 居中显示 | `boolean` | `false` |
| modal | 显示遮罩 | `boolean` | `true` |
| header | 显示 header | `boolean` | `true` |
| footer | 显示 footer | `boolean \| slot` | `true` |
| confirmDisabled | 禁用确认按钮 | `boolean` | `false` |
| confirmLoading | 确认按钮 loading 状态 | `boolean` | `false` |
| closeOnClickModal | 点击遮罩关闭弹窗 | `boolean` | `true` |
| closeOnPressEscape | ESC 关闭弹窗 | `boolean` | `true` |
| confirmText | 确认按钮文本 | `string \| slot` | `确认` |
| cancelText | 取消按钮文本 | `string \| slot` | `取消` |
| showCancelButton | 显示取消按钮 | `boolean` | `true` |
| showConfirmButton | 显示确认按钮 | `boolean` | `true` |
| class | modal 的 class（宽度通过此配置） | `string` | - |
| contentClass | modal 内容区域的 class | `string` | - |
| footerClass | modal 底部区域的 class | `string` | - |
| headerClass | modal 顶部区域的 class | `string` | - |
| bordered | 是否显示 border | `boolean` | `false` |
| zIndex | 弹窗的 ZIndex 层级 | `number` | `1000` |
| overlayBlur | 遮罩模糊度 | `number` | - |
| animationType | 动画类型 | `'slide' \| 'scale'` | `'slide'` |
| submitting | 标记为提交中，锁定弹窗当前状态 | `boolean` | `false` |

> `appendToMain` 可将弹窗挂载到内容区域，此时标签栏、导航菜单等不会被遮挡。需要页面根容器 `Page` 组件设置 `auto-content-height` 属性。

## Events

以下事件在 `useVbenModal({...})` 中传入才会生效：

| 事件名 | 描述 | 类型 |
| --- | --- | --- |
| onBeforeClose | 关闭前触发，返回 `false` 或 reject 则禁止关闭 | `()=>Promise<boolean> \| boolean` |
| onCancel | 点击取消按钮触发 | `()=>void` |
| onClosed | 关闭动画播放完毕时触发 | `()=>void` |
| onConfirm | 点击确认按钮触发 | `()=>void` |
| onOpenChange | 关闭或打开弹窗时触发 | `(isOpen:boolean)=>void` |
| onOpened | 打开动画播放完毕时触发 | `()=>void` |

## Slots

| 插槽名 | 描述 |
| --- | --- |
| default | 默认插槽 - 弹窗内容 |
| prepend-footer | 取消按钮左侧 |
| center-footer | 取消按钮和确认按钮中间 |
| append-footer | 确认按钮右侧 |

## modalApi

| 方法 | 描述 | 类型 |
| --- | --- | --- |
| setState | 动态设置弹窗状态属性 | `(((prev: ModalState) => Partial<ModalState>) \| Partial<ModalState>)=>modalApi` |
| open | 打开弹窗 | `()=>void` |
| close | 关闭弹窗 | `()=>void` |
| setData | 设置共享数据 | `<T>(data:T)=>modalApi` |
| getData | 获取共享数据 | `<T>()=>T` |
| useStore | 获取可响应式状态 | - |
| lock | 将弹窗标记为提交中，锁定当前状态 | `(isLock:boolean)=>modalApi` |
| unlock | 解除弹窗的锁定状态 | `()=>modalApi` |

> `lock` 方法锁定弹窗状态：确认按钮变为 loading，禁用取消和关闭按钮，禁止 ESC/遮罩关闭，开启 spinner 动画。调用 `close` 会自动解锁。
