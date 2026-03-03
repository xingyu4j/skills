---
name: vben-add-api
description: 在 Vben Admin 应用中新增 API 端点定义和可选的 Mock 路由。创建带类型的 API 函数和 Nitro Mock 路由。
---

# 新增 API 端点

在指定的 Vben Admin 应用中创建带类型的 API 函数，以及可选的 Mock 路由。

## Steps

### 1. Create API Module

Create `apps/<app>/src/api/<api-module>.ts`:

```ts
import { requestClient } from '#/api/request';

// Define request/response types
export interface ListParams {
  page: number;
  pageSize: number;
  // ... other params
}

export interface ListResult {
  items: ItemType[];
  total: number;
}

/**
 * Get list
 */
export async function getListApi(params: ListParams) {
  return requestClient.get<ListResult>('/api/<module>/list', { params });
}

/**
 * Get detail by id
 */
export async function getDetailApi(id: string) {
  return requestClient.get<ItemType>(`/api/<module>/${id}`);
}

/**
 * Create item
 */
export async function createApi(data: CreateData) {
  return requestClient.post<ItemType>('/api/<module>', data);
}

/**
 * Update item
 */
export async function updateApi(id: string, data: UpdateData) {
  return requestClient.put<ItemType>(`/api/<module>/${id}`, data);
}

/**
 * Delete item
 */
export async function deleteApi(id: string) {
  return requestClient.delete(`/api/<module>/${id}`);
}
```

Conventions:
- Always import `requestClient` from `#/api/request` (auto-unwraps `{ code, data, message }`).
- Use `baseRequestClient` from `#/api/request` when you need the raw Axios response.
- Define TypeScript interfaces for all request params and response data.
- Suffix all API functions with `Api`.
- Export from `apps/<app>/src/api/index.ts`.

### 2. Export from API Index

Update `apps/<app>/src/api/index.ts` to re-export:

```ts
export * from './<api-module>';
```

### 3. (Optional) Add Mock Routes

Create mock handler in `apps/backend-mock/api/<module>/`:

```ts
// apps/backend-mock/api/<module>/list.get.ts
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  // Use faker.js for mock data if needed
  return {
    code: 0,
    data: {
      items: [],
      total: 0,
    },
    message: 'ok',
  };
});
```

Nitro file-based routing convention:
- `list.get.ts` → `GET /api/<module>/list`
- `index.post.ts` → `POST /api/<module>`
- `[id].get.ts` → `GET /api/<module>/:id`
- `[id].put.ts` → `PUT /api/<module>/:id`
- `[id].delete.ts` → `DELETE /api/<module>/:id`

Response format must follow `{ code: 0, data: ..., message: 'ok' }`.

