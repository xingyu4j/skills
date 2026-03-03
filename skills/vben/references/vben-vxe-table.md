---
name: vben-vxe-table
description: Vben Vxe Table 表格组件，基于 vxe-table 二次封装，集成 Vben Form 搜索表单。
---

# Vben Vxe Table 表格

基于 [vxe-table](https://vxetable.cn/v4/#/grid/api?apiKey=grid) 二次封装的表格组件，结合 Vben Form 表单实现表头搜索。

> 更多参数说明参考 [vxe-grid 官方 API 文档](https://vxetable.cn/v4/#/grid/api?apiKey=grid)

## 适配器

每个应用可自行配置 vxe-table 适配器：

```ts
import { h } from 'vue';
import { setupVbenVxeTable, useVbenVxeGrid } from '@vben/plugins/vxe-table';
import { Button, Image } from 'ant-design-vue';
import { useVbenForm } from './form';

setupVbenVxeTable({
  configVxeTable: (vxeUI) => {
    vxeUI.setConfig({
      grid: {
        align: 'center',
        border: false,
        columnConfig: { resizable: true },
        minHeight: 180,
        formConfig: { enabled: false }, // 禁用 vxe 内置表单，使用 formOptions
        proxyConfig: {
          autoLoad: true,
          response: { result: 'items', total: 'total', list: 'items' },
          showActiveMsg: true,
          showResponseMsg: false,
        },
        round: true,
        showOverflow: true,
        size: 'small',
      },
    });

    // 自定义单元格渲染器
    vxeUI.renderer.add('CellImage', {
      renderTableDefault(_renderOpts, params) {
        const { column, row } = params;
        return h(Image, { src: row[column.field] });
      },
    });

    vxeUI.renderer.add('CellLink', {
      renderTableDefault(renderOpts) {
        const { props } = renderOpts;
        return h(Button, { size: 'small', type: 'link' }, { default: () => props?.text });
      },
    });
  },
  useVbenForm,
});

export { useVbenVxeGrid };
export type * from '@vben/plugins/vxe-table';
```

## 基础用法

```vue
<script setup lang="ts">
import { useVbenVxeGrid } from '#/adapter/vxe-table';

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {},
  formOptions: {},
  gridEvents: {},
});
</script>

<template>
  <Grid />
</template>
```

## 远程加载

通过 `proxyConfig.ajax.query` 实现远程加载：

```ts
const gridOptions = {
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getListApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};
```

## 树形表格

数据源为扁平结构时，通过 `treeConfig` 配置树形：

```ts
treeConfig: {
  transform: true,
  parentField: 'parentId',
  rowField: 'id',
},
```

## 搜索表单

搜索表单部分使用 Vben Form。可在 `toolbarConfig` 中配置 `search: true` 显示搜索表单控制按钮。

可自定义分隔条：

```ts
const [Grid] = useVbenVxeGrid({
  formOptions: {},
  gridOptions: {},
  separator: false,  // 完全移除分隔条
  // separator: { backgroundColor: 'rgba(100,100,0,0.5)' }, // 自定义颜色
});
```

## GridApi

`useVbenVxeGrid` 返回的第二个参数：

| 方法名 | 描述 | 类型 |
| --- | --- | --- |
| setLoading | 设置 loading 状态 | `(loading)=>void` |
| setGridOptions | 设置 vxe-table grid 组件参数 | `(options: Partial<VxeGridProps['gridOptions']>)=>void` |
| reload | 重载表格（会初始化） | `(params:any)=>void` |
| query | 重载表格（保留当前分页） | `(params:any)=>void` |
| grid | vxe-table grid 实例 | `VxeGridInstance` |
| formApi | vbenForm api 实例 | `FormApi` |
| toggleSearchForm | 设置搜索表单显示状态 | `(show?: boolean)=>boolean` |

## Props

| 属性名 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tableTitle | 表格标题 | `string` | - |
| tableTitleHelp | 表格标题帮助信息 | `string` | - |
| gridClass | grid 组件的 class | `string` | - |
| gridOptions | grid 组件的参数 | `VxeTableGridProps` | - |
| gridEvents | grid 组件触发的事件 | `VxeGridListeners` | - |
| formOptions | 表单参数 | `VbenFormProps` | - |
| showSearchForm | 是否显示搜索表单 | `boolean` | - |
| separator | 搜索表单与表格间的分隔条 | `boolean \| SeparatorOptions` | - |

## Slots

工具栏部分使用以下插槽：

| 插槽名 | 描述 |
| --- | --- |
| toolbar-actions | 工具栏左侧部分（表格标题附近） |
| toolbar-tools | 工具栏右侧部分（原生工具按钮的左侧） |
| table-title | 表格标题插槽 |

> 使用搜索表单时，所有以 `form-` 开头的命名插槽都会传递给表单。其它插槽参考 [vxe-table 官方文档](https://vxetable.cn/v4/#/grid/api)。
