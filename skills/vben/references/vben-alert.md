---
name: vben-alert
description: Vben Alert 轻量提示框，纯 JS 调用的 alert/confirm/prompt 弹窗。
---

# Vben Alert 轻量提示框

框架提供的轻量提示弹窗，仅使用 JS 代码即可动态创建，不需要在 template 中写任何代码。

> Alert 功能与 Modal 类似，但只适用于简单场景（临时性确认框、输入框等）。复杂需求请使用 VbenModal。

## 基础用法

```ts
import { alert, confirm, prompt } from '@vben/common-ui';

// alert - 只有确认按钮
await alert('操作成功');
await alert('操作成功', '提示');
await alert({ content: '操作成功', icon: 'success' });

// confirm - 确认 + 取消按钮
await confirm('确定要删除吗？');
await confirm({ content: '确定要删除吗？', icon: 'question' });

// prompt - 确认 + 取消 + 输入框
const value = await prompt({ content: '请输入名称', defaultValue: '' });
```

## useAlertContext

当弹窗的 content、footer、icon 使用自定义组件时，可在组件中使用 `useAlertContext` 获取弹窗上下文：

| 方法 | 描述 | 类型 |
| --- | --- | --- |
| doConfirm | 调用弹窗的确认操作 | `()=>void` |
| doCancel | 调用弹窗的取消操作 | `()=>void` |

> `useAlertContext` 只能用在 setup 或函数式组件中。

## 类型说明

```ts
/** 预置的图标类型 */
export type IconType = 'error' | 'info' | 'question' | 'success' | 'warning';

export type BeforeCloseScope = {
  /** 是否为点击确认按钮触发的关闭 */
  isConfirm: boolean;
};

/** alert 属性 */
export type AlertProps = {
  beforeClose?: (scope: BeforeCloseScope) => boolean | Promise<boolean | undefined> | undefined;
  bordered?: boolean;
  buttonAlign?: 'center' | 'end' | 'start';
  cancelText?: string;
  centered?: boolean;
  confirmText?: string;
  containerClass?: string;
  content: Component | string;
  contentClass?: string;
  contentMasking?: boolean;
  footer?: Component | string;
  icon?: Component | IconType;
  overlayBlur?: number;
  showCancel?: boolean;
  title?: string;
};

/** prompt 属性 */
export type PromptProps<T = any> = {
  beforeClose?: (scope: { isConfirm: boolean; value: T | undefined }) =>
    boolean | Promise<boolean | undefined> | undefined;
  component?: Component;
  componentProps?: Recordable<any>;
  componentSlots?: Recordable<Component>;
  defaultValue?: T;
  modelPropName?: string;
} & Omit<AlertProps, 'beforeClose'>;

/** 函数签名 */
export function alert(options: AlertProps): Promise<void>;
export function alert(message: string, options?: Partial<AlertProps>): Promise<void>;
export function alert(message: string, title?: string, options?: Partial<AlertProps>): Promise<void>;

export async function prompt<T = any>(options: PromptProps<T>): Promise<T | undefined>;
```
