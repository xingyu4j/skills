---
name: vben-add-page
description: 在 Vben Admin 应用中新增页面/视图。创建 Vue 组件、路由模块和国际化配置。
---

# 新增页面

在指定的 Vben Admin 应用中创建新页面，包含视图组件、路由模块和国际化配置。

## Steps

### 1. Create View Component

Create `apps/<app>/src/views/<module-name>/index.vue`:

```vue
<script lang="ts" setup>
import { $t } from '#/locales';
</script>

<template>
  <div class="p-5">
    <!-- Page content here -->
  </div>
</template>
```

Conventions:
- Use `<script lang="ts" setup>` always
- Use TailwindCSS utility classes
- Use `$t()` for all user-facing text
- Import shared components from `@vben/common-ui`
- Import app-specific components with `#/` prefix

### 2. Create Route Module

Create `apps/<app>/src/router/routes/modules/<module-name>.ts`:

```ts
import type { RouteRecordRaw } from 'vue-router';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:<icon>',
      order: <number>,
      title: $t('page.<moduleName>.title'),
    },
    name: '<ModuleName>',
    path: '/<module-name>',
    children: [
      {
        name: '<SubPageName>',
        path: '/<module-name>/<sub-page>',
        component: () => import('#/views/<module-name>/index.vue'),
        meta: {
          icon: 'lucide:<icon>',
          title: $t('page.<moduleName>.<subPage>'),
        },
      },
    ],
  },
];

export default routes;
```

Route meta fields:
- `icon`: Iconify format (`lucide:xxx`, `carbon:xxx`, `ant-design:xxx`)
- `order`: Number for menu ordering (-1 = first)
- `title`: Always use `$t()` for i18n
- `affixTab`: Pin to tabbar
- `hideInMenu`: Hide from sidebar
- `ignoreAccess`: Skip permission check
- `authority`: Array of role strings (frontend access mode)

### 3. Add i18n Keys

Add keys to both locale files:

`apps/<app>/src/locales/langs/zh-CN/page.json` (or relevant JSON):
```json
{
  "<moduleName>": {
    "title": "模块标题",
    "<subPage>": "子页面标题"
  }
}
```

`apps/<app>/src/locales/langs/en-US/page.json`:
```json
{
  "<moduleName>": {
    "title": "Module Title",
    "<subPage>": "Sub Page Title"
  }
}
```

### 4. Verify

- Check that the route file exports a `routes` array as default.
- Ensure all `$t()` keys have corresponding i18n entries.
- Ensure component lazy-loading uses `() => import('#/views/...')`.

