---
name: vben-form
description: Vben Form 表单组件，适配多 UI 框架，底层基于 vee-validate 进行表单验证。
---

# Vben Form 表单

框架提供的表单组件，可适配 `Element Plus`、`Ant Design Vue`、`Naive UI` 等框架。底层使用 [vee-validate](https://vee-validate.logaretm.com/v4/) 进行表单验证。

## 适配器

每个应用在 `src/adapter/form` 和 `src/adapter/component` 中进行组件适配。

### Ant Design Vue 表单适配器示例

```ts
import type {
  VbenFormSchema as FormSchema,
  VbenFormProps,
} from '@vben/common-ui';

import type { ComponentType } from './component';

import { setupVbenForm, useVbenForm as useForm, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

setupVbenForm<ComponentType>({
  config: {
    // ant design vue 组件库默认都是 v-model:value
    baseModelPropName: 'value',
    // 一些组件是 v-model:checked 或者 v-model:fileList
    modelPropNameMap: {
      Checkbox: 'checked',
      Radio: 'checked',
      Switch: 'checked',
      Upload: 'fileList',
    },
  },
  defineRules: {
    required: (value, _params, ctx) => {
      if (value === undefined || value === null || value.length === 0) {
        return $t('ui.formRules.required', [ctx.label]);
      }
      return true;
    },
    selectRequired: (value, _params, ctx) => {
      if (value === undefined || value === null) {
        return $t('ui.formRules.selectRequired', [ctx.label]);
      }
      return true;
    },
  },
});

const useVbenForm = useForm<ComponentType>;

export { useVbenForm, z };
export type VbenFormSchema = FormSchema<ComponentType>;
export type { VbenFormProps };
```

### Ant Design Vue 组件适配器示例

```ts
import type { BaseFormComponentType } from '@vben/common-ui';
import type { Component, SetupContext } from 'vue';
import { h } from 'vue';

import { globalShareState, IconPicker } from '@vben/common-ui';
import { $t } from '@vben/locales';

const AutoComplete = defineAsyncComponent(() => import('ant-design-vue/es/auto-complete'));
const Button = defineAsyncComponent(() => import('ant-design-vue/es/button'));
const Checkbox = defineAsyncComponent(() => import('ant-design-vue/es/checkbox'));
const CheckboxGroup = defineAsyncComponent(() =>
  import('ant-design-vue/es/checkbox').then((res) => res.CheckboxGroup),
);
const DatePicker = defineAsyncComponent(() => import('ant-design-vue/es/date-picker'));
const Divider = defineAsyncComponent(() => import('ant-design-vue/es/divider'));
const Input = defineAsyncComponent(() => import('ant-design-vue/es/input'));
const InputNumber = defineAsyncComponent(() => import('ant-design-vue/es/input-number'));
const InputPassword = defineAsyncComponent(() =>
  import('ant-design-vue/es/input').then((res) => res.InputPassword),
);
const Mentions = defineAsyncComponent(() => import('ant-design-vue/es/mentions'));
const Radio = defineAsyncComponent(() => import('ant-design-vue/es/radio'));
const RadioGroup = defineAsyncComponent(() =>
  import('ant-design-vue/es/radio').then((res) => res.RadioGroup),
);
const RangePicker = defineAsyncComponent(() =>
  import('ant-design-vue/es/date-picker').then((res) => res.RangePicker),
);
const Rate = defineAsyncComponent(() => import('ant-design-vue/es/rate'));
const Select = defineAsyncComponent(() => import('ant-design-vue/es/select'));
const Space = defineAsyncComponent(() => import('ant-design-vue/es/space'));
const Switch = defineAsyncComponent(() => import('ant-design-vue/es/switch'));
const Textarea = defineAsyncComponent(() =>
  import('ant-design-vue/es/input').then((res) => res.Textarea),
);
const TimePicker = defineAsyncComponent(() => import('ant-design-vue/es/time-picker'));
const TreeSelect = defineAsyncComponent(() => import('ant-design-vue/es/tree-select'));
const Upload = defineAsyncComponent(() => import('ant-design-vue/es/upload'));

const withDefaultPlaceholder = <T extends Component>(
  component: T,
  type: 'input' | 'select',
) => {
  return (props: any, { attrs, slots }: Omit<SetupContext, 'expose'>) => {
    const placeholder = props?.placeholder || $t(`ui.placeholder.${type}`);
    return h(component, { ...props, ...attrs, placeholder }, slots);
  };
};

// 需要自行根据业务组件库进行适配，需要用到的组件都需要在这里类型说明
export type ComponentType =
  | 'AutoComplete'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'DatePicker'
  | 'DefaultButton'
  | 'Divider'
  | 'Input'
  | 'InputNumber'
  | 'InputPassword'
  | 'Mentions'
  | 'PrimaryButton'
  | 'Radio'
  | 'RadioGroup'
  | 'RangePicker'
  | 'Rate'
  | 'Select'
  | 'Space'
  | 'Switch'
  | 'Textarea'
  | 'TimePicker'
  | 'TreeSelect'
  | 'Upload'
  | 'IconPicker'
  | BaseFormComponentType;

async function initComponentAdapter() {
  const components: Partial<Record<ComponentType, Component>> = {
    AutoComplete,
    Checkbox,
    CheckboxGroup,
    DatePicker,
    DefaultButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'default' }, slots);
    },
    Divider,
    IconPicker,
    Input: withDefaultPlaceholder(Input, 'input'),
    InputNumber: withDefaultPlaceholder(InputNumber, 'input'),
    InputPassword: withDefaultPlaceholder(InputPassword, 'input'),
    Mentions: withDefaultPlaceholder(Mentions, 'input'),
    PrimaryButton: (props, { attrs, slots }) => {
      return h(Button, { ...props, attrs, type: 'primary' }, slots);
    },
    Radio,
    RadioGroup,
    RangePicker,
    Rate,
    Select: withDefaultPlaceholder(Select, 'select'),
    Space,
    Switch,
    Textarea: withDefaultPlaceholder(Textarea, 'input'),
    TimePicker,
    TreeSelect: withDefaultPlaceholder(TreeSelect, 'select'),
    Upload,
  };

  globalShareState.setComponents(components);
}

export { initComponentAdapter };
```

## 基础用法

使用 `useVbenForm` 创建表单：

```vue
<script setup lang="ts">
import { useVbenForm } from '#/adapter/form';

const [Form, formApi] = useVbenForm({
  // 属性和事件
});
</script>

<template>
  <Form />
</template>
```

## FormApi

`useVbenForm` 返回的第二个参数，包含表单操作方法：

| 方法名 | 描述 | 类型 |
| --- | --- | --- |
| submitForm | 提交表单 | `(e:Event)=>Promise<Record<string,any>>` |
| validateAndSubmitForm | 提交并校验表单 | `(e:Event)=>Promise<Record<string,any>>` |
| resetForm | 重置表单 | `()=>Promise<void>` |
| setValues | 设置表单值（默认过滤不在 schema 中的字段，可通过 filterFields 关闭） | `(fields: Record<string, any>, filterFields?: boolean, shouldValidate?: boolean) => Promise<void>` |
| getValues | 获取表单值 | `(fields:Record<string, any>,shouldValidate: boolean = false)=>Promise<void>` |
| validate | 表单校验 | `()=>Promise<void>` |
| validateField | 校验指定字段 | `(fieldName: string)=>Promise<ValidationResult<unknown>>` |
| isFieldValid | 检查某个字段是否已通过校验 | `(fieldName: string)=>Promise<boolean>` |
| resetValidate | 重置表单校验 | `()=>Promise<void>` |
| updateSchema | 更新 formSchema | `(schema:FormSchema[])=>void` |
| setFieldValue | 设置字段值 | `(field: string, value: any, shouldValidate?: boolean)=>Promise<void>` |
| setState | 设置组件状态（props） | `(stateOrFn: ((prev: VbenFormProps) => Partial<VbenFormProps>) \| Partial<VbenFormProps>)=>Promise<void>` |
| getState | 获取组件状态（props） | `()=>Promise<VbenFormProps>` |
| form | 表单对象实例，见 [useForm](https://vee-validate.logaretm.com/v4/api/use-form/) | - |
| getFieldComponentRef | 获取指定字段的组件实例 | `<T=unknown>(fieldName: string)=>T` |
| getFocusedField | 获取当前已获得焦点的字段 | `()=>string\|undefined` |

## Props

所有属性都可以传入 `useVbenForm` 的第一个参数中。

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 表单项布局 | `'horizontal' \| 'vertical' \| 'inline'` | `horizontal` |
| showCollapseButton | 是否显示折叠按钮 | `boolean` | `false` |
| wrapperClass | 表单的布局，基于 TailwindCSS | `any` | - |
| actionWrapperClass | 表单操作区域 class | `any` | - |
| actionLayout | 表单操作按钮位置 | `'newLine' \| 'rowEnd' \| 'inline'` | `rowEnd` |
| actionPosition | 表单操作按钮对齐方式 | `'left' \| 'center' \| 'right'` | `right` |
| handleReset | 表单重置回调 | `(values: Record<string, any>) => Promise<void> \| void` | - |
| handleSubmit | 表单提交回调 | `(values: Record<string, any>) => Promise<void> \| void` | - |
| handleValuesChange | 表单值变化回调 | `(values: Record<string, any>, fieldsChanged: string[]) => void` | - |
| handleCollapsedChange | 表单收起展开状态变化回调 | `(collapsed: boolean) => void` | - |
| actionButtonsReverse | 调换操作按钮位置 | `boolean` | `false` |
| resetButtonOptions | 重置按钮组件参数 | `ActionButtonOptions` | - |
| submitButtonOptions | 提交按钮组件参数 | `ActionButtonOptions` | - |
| showDefaultActions | 是否显示默认操作按钮 | `boolean` | `true` |
| collapsed | 是否折叠（`showCollapseButton` 为 `true` 时生效） | `boolean` | `false` |
| collapseTriggerResize | 折叠时触发 `resize` 事件 | `boolean` | `false` |
| collapsedRows | 折叠时保持的行数 | `number` | `1` |
| fieldMappingTime | 将表单内的数组值映射成 2 个字段 | `[string, [string, string], string?][]` | - |
| commonConfig | 表单项的通用配置（每项可覆盖） | `FormCommonConfig` | - |
| schema | 表单项配置 | `FormSchema[]` | - |
| submitOnEnter | 按下回车键时提交表单 | `boolean` | `false` |
| submitOnChange | 字段值改变时提交表单（内部防抖，一般用于搜索表单） | `boolean` | `false` |
| compact | 紧凑模式（忽略校验信息预留空间） | `boolean` | `false` |
| scrollToFirstError | 表单验证失败时自动滚动到第一个错误字段 | `boolean` | `false` |

## TS 类型说明

### ActionButtonOptions

```ts
export interface ActionButtonOptions {
  class?: ClassType;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonVariantSize;
  variant?: ButtonVariants;
  show?: boolean;
  content?: string;
  [key: string]: any;
}
```

### FormCommonConfig

```ts
export interface FormCommonConfig {
  componentProps?: ComponentProps;
  controlClass?: string;
  colon?: boolean;
  disabled?: boolean;
  formFieldProps?: Partial<typeof Field>;
  formItemClass?: (() => string) | string;
  hideLabel?: boolean;
  hideRequiredMark?: boolean;
  labelClass?: string;
  labelWidth?: number;
  modelPropName?: string; // 默认 "modelValue"
  wrapperClass?: string;
}
```

### FormSchema

```ts
export interface FormSchema<T extends BaseFormComponentType = BaseFormComponentType>
  extends FormCommonConfig {
  component: Component | T;
  componentProps?: ComponentProps;
  defaultValue?: any;
  dependencies?: FormItemDependencies;
  description?: string;
  fieldName: string;
  help?: CustomRenderType;
  hide?: boolean;
  label?: CustomRenderType;
  renderComponentContent?: RenderComponentContentType;
  rules?: FormSchemaRuleType;
  suffix?: CustomRenderType;
}
```

## 表单联动

通过 schema 的 `dependencies` 属性实现字段联动：

```ts
dependencies: {
  triggerFields: ['name'],         // 触发字段
  if(values, formApi) {},          // 动态判断是否显示（不显示则销毁）
  show(values, formApi) {},        // 动态判断是否显示（不显示用 CSS 隐藏）
  disabled(values, formApi) {},    // 动态禁用
  trigger(values, formApi) {},     // 字段变更时触发
  rules(values, formApi) {},       // 动态 rules
  required(values, formApi) {},    // 动态必填
  componentProps(values, formApi) {}, // 动态组件参数
}
```

## 表单校验

通过 schema 的 `rules` 属性配置。可以是预定义规则名称或 zod schema。

### 预定义校验规则

```ts
{ rules: 'required' }       // 输入项必填
{ rules: 'selectRequired' } // 选择项必填
```

### zod 校验

```ts
import { z } from '#/adapter/form';

{ rules: z.string().min(1, { message: '请输入字符串' }) }
{ rules: z.string().default('默认值').optional() }
{ rules: z.string().email().or(z.literal('')).optional() }
```

## Slots

| 插槽名 | 描述 |
| --- | --- |
| reset-before | 重置按钮之前的位置 |
| submit-before | 提交按钮之前的位置 |
| expand-before | 展开按钮之前的位置 |
| expand-after | 展开按钮之后的位置 |

> schema 中每个字段的 `fieldName` 都可以作为插槽名称，优先级高于 `component` 定义的组件。
