---
name: vben-crud
description: 为 Vben Admin 生成完整 CRUD 模块，包括表格页面、搜索表单、新建/编辑弹窗、API 定义、路由模块和国际化配置。
---

# 生成 CRUD 模块

为 Vben Admin 创建完整的 CRUD 模块，包含表格列表、搜索表单、新建/编辑弹窗、删除确认、API 定义、路由和国际化。

## Before Starting

1. Read existing CRUD examples in the target app to match patterns:
   - `playground/src/views/examples/vxe-table/form.vue` — Table with search form
   - `playground/src/views/examples/modal/` — Modal dialog patterns
   - `playground/src/views/examples/form/` — Form field patterns
2. Read `apps/<app>/src/adapter/form.ts` to understand available `ComponentType`.
3. Read `apps/<app>/src/adapter/vxe-table.ts` (if exists) for table adapter.

## Files to Create

### 1. API Module — `apps/<app>/src/api/<module>.ts`

```ts
import { requestClient } from '#/api/request';

export namespace <ModuleName>Api {
  export interface Item {
    id: string;
    // ... fields
    createdAt: string;
    updatedAt: string;
  }

  export interface ListParams {
    page: number;
    pageSize: number;
    // ... search fields
  }

  export interface ListResult {
    items: Item[];
    total: number;
  }

  export type CreateParams = Omit<Item, 'id' | 'createdAt' | 'updatedAt'>;
  export type UpdateParams = Partial<CreateParams>;
}

export async function get<ModuleName>ListApi(params: <ModuleName>Api.ListParams) {
  return requestClient.get<<ModuleName>Api.ListResult>('/api/<module>/list', { params });
}

export async function create<ModuleName>Api(data: <ModuleName>Api.CreateParams) {
  return requestClient.post<<ModuleName>Api.Item>('/api/<module>', data);
}

export async function update<ModuleName>Api(id: string, data: <ModuleName>Api.UpdateParams) {
  return requestClient.put<<ModuleName>Api.Item>(`/api/<module>/${id}`, data);
}

export async function delete<ModuleName>Api(id: string) {
  return requestClient.delete(`/api/<module>/${id}`);
}
```

Export from `apps/<app>/src/api/index.ts`.

### 2. Table Page — `apps/<app>/src/views/<module>/index.vue`

Use `useVbenVxeGrid` for table with integrated search form:

```vue
<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';

import { Button, message, Popconfirm, Space } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { get<ModuleName>ListApi, delete<ModuleName>Api } from '#/api';
import { $t } from '#/locales';

import EditModal from './modules/edit-modal.vue';

interface RowType {
  id: string;
  // ... typed fields
}

const formOptions: VbenFormProps = {
  collapsed: false,
  schema: [
    {
      component: 'Input',
      fieldName: 'keyword',
      label: $t('page.<module>.keyword'),
    },
    // ... search fields
  ],
  showCollapseButton: true,
  submitOnChange: false,
  submitOnEnter: true,
};

const gridOptions: VxeTableGridOptions<RowType> = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    // ... data columns
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: $t('common.action'),
      width: 160,
    },
  ],
  height: 'auto',
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await get<ModuleName>ListApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  toolbarConfig: {
    custom: true,
    refresh: true,
    search: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [EditModalComp, editModalApi] = useVbenModal({
  connectedComponent: EditModal,
});

function handleCreate() {
  editModalApi.setData({ mode: 'create' }).open();
}

function handleEdit(row: RowType) {
  editModalApi.setData({ mode: 'edit', record: row }).open();
}

async function handleDelete(row: RowType) {
  await delete<ModuleName>Api(row.id);
  message.success($t('common.deleteSuccess'));
  gridApi.grid.commitProxy('query');
}

function handleSuccess() {
  gridApi.grid.commitProxy('query');
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-tools>
        <Button type="primary" @click="handleCreate">
          {{ $t('common.create') }}
        </Button>
      </template>
      <template #action="{ row }">
        <Space>
          <Button size="small" type="link" @click="handleEdit(row)">
            {{ $t('common.edit') }}
          </Button>
          <Popconfirm
            :title="$t('common.confirmDelete')"
            @confirm="handleDelete(row)"
          >
            <Button danger size="small" type="link">
              {{ $t('common.delete') }}
            </Button>
          </Popconfirm>
        </Space>
      </template>
    </Grid>
    <EditModalComp @success="handleSuccess" />
  </Page>
</template>
```

### 3. Edit Modal — `apps/<app>/src/views/<module>/modules/edit-modal.vue`

```vue
<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { create<ModuleName>Api, update<ModuleName>Api } from '#/api';
import { $t } from '#/locales';

const emit = defineEmits<{ success: [] }>();

const mode = ref<'create' | 'edit'>('create');
const currentId = ref<string>('');

const isEdit = computed(() => mode.value === 'edit');
const title = computed(() =>
  isEdit.value ? $t('common.edit') : $t('common.create'),
);

const formSchema: VbenFormSchema[] = [
  // ... form field schemas
];

const [Form, formApi] = useVbenForm({
  commonConfig: { componentProps: { class: 'w-full' } },
  schema: formSchema,
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  onConfirm: handleConfirm,
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<{
        mode: 'create' | 'edit';
        record?: Record<string, any>;
      }>();
      if (data) {
        mode.value = data.mode;
        if (data.mode === 'edit' && data.record) {
          currentId.value = data.record.id;
          formApi.setValues(data.record);
        }
      }
    }
  },
});

async function handleConfirm() {
  const { valid, values } = await formApi.validateAndSubmitForm();
  if (!valid) return;

  modalApi.setState({ confirmLoading: true });
  try {
    if (isEdit.value) {
      await update<ModuleName>Api(currentId.value, values);
      message.success($t('common.updateSuccess'));
    } else {
      await create<ModuleName>Api(values);
      message.success($t('common.createSuccess'));
    }
    emit('success');
    modalApi.close();
  } finally {
    modalApi.setState({ confirmLoading: false });
  }
}
</script>

<template>
  <Modal :title="title">
    <Form />
  </Modal>
</template>
```

### 4. Route Module — `apps/<app>/src/router/routes/modules/<module>.ts`

Follow the route module pattern with `$t()` for titles, Iconify icons, and lazy component loading.

### 5. i18n Keys

Add both `zh-CN` and `en-US` keys for:
- Page title and subtitle
- All form field labels
- All table column headers
- Action button labels (if custom beyond common.edit/common.delete)

### 6. (Optional) Mock Backend Routes

If the user wants mock data, create Nitro routes in `apps/backend-mock/api/<module>/`.

## Key Patterns

- **VxeGrid + Form integration**: `useVbenVxeGrid({ formOptions, gridOptions })` returns `[Grid, gridApi]`.
- **Modal pattern**: `useVbenModal({ connectedComponent })` returns `[ModalComp, modalApi]`.
- **Data passing**: Use `modalApi.setData(data)` to pass data, `modalApi.getData()` to receive.
- **Form validation**: `formApi.validateAndSubmitForm()` returns `{ valid, values }`.
- **Table refresh**: `gridApi.grid.commitProxy('query')` to re-fetch data.
- **Page wrapper**: Use `<Page auto-content-height>` for proper layout.

## UI Library Adaptation

For different UI libraries, replace the ant-design-vue specific imports:
- `web-antd`: `ant-design-vue` (Button, message, Popconfirm, Space, etc.)
- `web-antdv-next`: `antdv-next` (Button, message, Popconfirm, Space, etc.)
- `web-ele`: `element-plus` (ElButton, ElMessage, ElPopconfirm, etc.)
- `web-naive`: `naive-ui` (NButton, useMessage, NPopconfirm, etc.)
- `web-tdesign`: `tdesign-vue-next` (TButton, MessagePlugin, TPopconfirm, etc.)

