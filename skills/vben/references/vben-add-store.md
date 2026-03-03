---
name: vben-add-store
description: 在 Vben Admin 应用中新增 Pinia Store。使用 Composition API 创建带类型、重置方法的 Store。
---

# 新增 Pinia Store

在指定的 Vben Admin 应用中创建新的 Pinia Store。

## Steps

### 1. Create Store File

Create `apps/<app>/src/store/<store-name>.ts`:

```ts
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const use<StoreName>Store = defineStore('<store-name>', () => {
  // State
  const items = ref<ItemType[]>([]);
  const loading = ref(false);
  const currentItem = ref<ItemType | null>(null);

  // Getters (computed)
  const itemCount = computed(() => items.value.length);

  // Actions
  async function fetchItems() {
    loading.value = true;
    try {
      items.value = await getItemsApi();
    } finally {
      loading.value = false;
    }
  }

  // Required $reset method for store cleanup
  function $reset() {
    items.value = [];
    loading.value = false;
    currentItem.value = null;
  }

  return {
    $reset,
    currentItem,
    fetchItems,
    itemCount,
    items,
    loading,
  };
});
```

Conventions:
- **Always use Composition API style** (`defineStore('name', () => { ... })`).
- **Always include a `$reset` method** that resets all state to initial values.
- Use `ref()` for state, `computed()` for getters.
- Store name: `use<PascalName>Store`, store id: `kebab-case`.
- Import API functions from `#/api`.
- Export return object properties in **alphabetical order**.

### 2. Export from Store Index

Update `apps/<app>/src/store/index.ts`:

```ts
export { use<StoreName>Store } from './<store-name>';
```

### Important Notes

- **App-level stores** go in `apps/<app>/src/store/` — for app-specific state.
- **Global stores** (`useAccessStore`, `useUserStore`, `useTabbarStore`) are in `packages/stores/` — shared across all apps.
- Global stores are initialized via `initStores(app, { namespace })` in bootstrap.
- App stores can import global stores: `import { useAccessStore } from '@vben/stores'`.
- Use `resetAllStores()` from `@vben/stores` to reset all stores on logout.

