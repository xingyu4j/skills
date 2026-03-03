---
name: vben-api-component
description: Vben ApiComponent API 组件包装器，为目标组件提供自动获取远程数据的能力。
---

# Vben ApiComponent API 组件包装器

API "包装器"组件，一般不独立使用，主要用于包装其它组件，为目标组件提供自动获取远程数据的能力，同时保持目标组件的原始用法。

> 框架在各应用的组件适配器中，使用 ApiComponent 包装了 Select、TreeSelect 组件，使其可以自动获取远程数据并生成选项。其它类似组件（如 Cascader）可参考示例自行包装。

## 基础用法

通过 `component` 传入目标组件，配置 `api` 获取数据，用 `resultField` 提取数组，用 `valueField`、`labelField` 提取 value 和 label，最后通过 `optionsPropName` 传递给目标组件。

```vue
<template>
  <ApiComponent
    :api="fetchApi"
    :component="Cascader"
    :immediate="false"
    children-field="children"
    loading-slot="suffixIcon"
    visible-event="onDropdownVisibleChange"
  />
</template>
```

## 并发和缓存

多个 ApiComponent 使用相同数据源时，可用 Tanstack Query 的 `useQuery` 包装接口请求函数，避免重复请求。

## Props

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue (v-model) | 当前值 | `any` | - |
| component | 欲包装的目标组件 | `Component` | - |
| numberToString | 是否将 value 从数字转为 string | `boolean` | `false` |
| api | 获取数据的函数 | `(arg?: any) => Promise<OptionsItem[] \| Record<string, any>>` | - |
| params | 传递给 api 的参数 | `Record<string, any>` | - |
| resultField | 从 api 返回结果中提取 options 数组的字段名 | `string` | - |
| labelField | label 字段名 | `string` | `label` |
| childrenField | 子级数据字段名（树形结构递归处理） | `string` | - |
| valueField | value 字段名 | `string` | `value` |
| optionsPropName | 目标组件接收 options 数据的属性名称 | `string` | `options` |
| modelPropName | 目标组件的双向绑定属性名 | `string` | `modelValue` |
| immediate | 是否立即调用 api | `boolean` | `true` |
| alwaysLoad | 每次 visibleEvent 事件发生时都重新请求数据 | `boolean` | `false` |
| beforeFetch | api 请求之前的回调 | `AnyPromiseFunction<any, any>` | - |
| afterFetch | api 请求之后的回调 | `AnyPromiseFunction<any, any>` | - |
| options | 直接传入选项数据（也作为 api 返回空数据时的后备） | `OptionsItem[]` | - |
| visibleEvent | 触发重新请求数据的事件名 | `string` | - |
| loadingSlot | 目标组件的插槽名称（用于显示加载中图标） | `string` | - |
| autoSelect | 自动设置选项（`'first'` / `'last'` / `'one'` / 自定义函数 / `false`） | `string \| function \| false` | `false` |

## Methods

| 方法 | 描述 | 类型 |
| --- | --- | --- |
| getComponentRef | 获取被包装组件的实例 | `()=>T` |
| updateParam | 设置接口请求参数（与 params 合并） | `(newParams: Record<string, any>)=>void` |
| getOptions | 获取已加载的选项数据 | `()=>OptionsItem[]` |
| getValue | 获取当前值 | `()=>any` |
