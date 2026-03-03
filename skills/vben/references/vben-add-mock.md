---
name: vben-add-mock
description: 在 Nitro 后端 Mock 服务中添加模拟 API 路由。创建 h3 事件处理器和 faker.js 数据。
---

# 新增 Mock API 路由

在 `apps/backend-mock/` 中创建基于 Nitro 的模拟 API 路由。

## Steps

### 1. Understand Nitro File-Based Routing

Routes in `apps/backend-mock/api/` use file-based routing:

| File | Method | Route |
|------|--------|-------|
| `<module>/list.get.ts` | GET | `/api/<module>/list` |
| `<module>/index.post.ts` | POST | `/api/<module>` |
| `<module>/index.get.ts` | GET | `/api/<module>` |
| `<module>/[id].get.ts` | GET | `/api/<module>/:id` |
| `<module>/[id].put.ts` | PUT | `/api/<module>/:id` |
| `<module>/[id].delete.ts` | DELETE | `/api/<module>/:id` |

### 2. Create Mock Route Handlers

Example — List endpoint:

```ts
// apps/backend-mock/api/<module>/list.get.ts
import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler((event) => {
  const { page = 1, pageSize = 10 } = getQuery(event);

  const items = Array.from({ length: Number(pageSize) }, (_, i) => ({
    id: `${(Number(page) - 1) * Number(pageSize) + i + 1}`,
    name: `Item ${(Number(page) - 1) * Number(pageSize) + i + 1}`,
    createdAt: new Date().toISOString(),
  }));

  return {
    code: 0,
    data: {
      items,
      total: 100,
    },
    message: 'ok',
  };
});
```

Example — Create endpoint:

```ts
// apps/backend-mock/api/<module>/index.post.ts
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  return {
    code: 0,
    data: {
      id: Math.random().toString(36).slice(2),
      ...body,
      createdAt: new Date().toISOString(),
    },
    message: 'ok',
  };
});
```

### 3. Response Format

All mock responses MUST follow:

```ts
{
  code: 0,        // 0 = success, non-zero = error
  data: { ... },  // Response data
  message: 'ok',  // Status message
}
```

For error responses:

```ts
{
  code: -1,
  data: null,
  message: 'Error description',
}
```

### 4. Conventions

- Use `defineEventHandler` from `h3` for all handlers.
- Use `readBody(event)` to read POST/PUT body.
- Use `getQuery(event)` to read query parameters.
- Use `getRouterParam(event, 'id')` to read URL parameters.
- Use `faker-js` for generating realistic mock data (already a dependency).
- Existing auth utilities are in `apps/backend-mock/utils/`.
- Check `apps/backend-mock/api/user/` for reference implementations.

