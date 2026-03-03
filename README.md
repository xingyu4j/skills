# Xingyu's Skills

> [!NOTE]
> 感谢 [Anthony Fu](https://github.com/antfu) 开源的[skills](https://github.com/antfu/skills)

A curated collection of [Agent Skills](https://agentskills.io/home) reflecting [xingyu](https://github.com/xingyu4j)'s preferences, experience, and best practices, along with usage documentation for the tools.

> [!IMPORTANT]
> This is a proof-of-concept project for generating agent skills from source documentation and keeping them in sync.
> I haven't fully tested how well the skills perform in practice, so feedback and contributions are greatly welcome.

## Installation

```bash
pnpx skills add xingyu4j/skills --skill='*'
```

or to install all of them globally:

```bash
pnpx skills add xingyu4j/skills --skill='*' -g
```

Learn more about the CLI usage at [skills](https://github.com/vercel-labs/skills).

## Skills

This collection aims to be a one-stop collection if you are mainly working on Vue/Vite/Nuxt. It includes skills from different sources with different scopes.

### Hand-maintained Skills

> Opinionated

Manually maintained by xingyu with preferred tools, setup conventions, and best practices.

| Skill | Description |
|-------|-------------|
| [antfu](skills/antfu) | xingyu 的主观工具链和 JavaScript/TypeScript 项目约定（eslint, pnpm, vitest, vue 等） |

### Skills Generated from Official Documentation

> Unopinionated but with tilted focus (e.g. TypeScript, ESM, Composition API, and other modern stacks)

Generated from official documentation and fine-tuned by xingyu.

| Skill | Description | Source |
|-------|-------------|--------|
| [vue](skills/vue) | Vue 3 Composition API、响应式系统和内置组件 | [vuejs/docs](https://github.com/vuejs/docs) |
| [nuxt](skills/nuxt) | Nuxt 全栈 Vue 框架，支持 SSR、自动导入和基于文件的路由 | [nuxt/nuxt](https://github.com/nuxt/nuxt) |
| [pinia](skills/pinia) | Pinia 官方 Vue 状态管理库，类型安全且可扩展 | [vuejs/pinia](https://github.com/vuejs/pinia) |
| [vite](skills/vite) | Vite 构建工具配置、插件 API、SSR 和库模式 | [vitejs/vite](https://github.com/vitejs/vite) |
| [vitepress](skills/vitepress) | VitePress 基于 Vite 和 Vue 的静态站点生成器 | [vuejs/vitepress](https://github.com/vuejs/vitepress) |
| [vitest](skills/vitest) | Vitest 基于 Vite 的快速单元测试框架 | [vitest-dev/vitest](https://github.com/vitest-dev/vitest) |
| [pnpm](skills/pnpm) | pnpm 高性能 Node.js 包管理器 | [pnpm/pnpm.io](https://github.com/pnpm/pnpm.io) |
| [vben](skills/vben) | Vue Vben Admin monorepo 项目，多 UI 库变体 | [vbenjs/vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) |
| [tailwindcss](skills/tailwindcss) | Tailwind CSS v4 + shadcn-vue 主题配置与暗色模式 | [tailwindlabs/tailwindcss.com](https://github.com/tailwindlabs/tailwindcss.com) |

### Community Skills

Third-party community skills, manually curated and maintained.

| Skill | Description | Source |
|-------|-------------|--------|
| [inspira-ui](skills/inspira-ui) | 120+ Vue/Nuxt 动画组件库，TailwindCSS v4 + motion-v + Three.js | [unovue/inspira-ui](https://github.com/unovue/inspira-ui) |
| [nuxt-content](skills/nuxt-content) | Nuxt Content v3 Git-based CMS，支持 Markdown/MDC 内容站点 | [nuxt/content](https://github.com/nuxt/content) |
| [nuxt-seo](skills/nuxt-seo) | Nuxt SEO 全套 8 个模块（robots、sitemap、og-image、schema-org 等） | [harlan-zw/nuxt-seo](https://github.com/harlan-zw/nuxt-seo) |

### Vendored Skills

Synced from external repositories that maintain their own skills.

| Skill | Description | Source |
|-------|-------------|--------|
| [slidev](skills/slidev) (Official) | Slidev - 面向开发者的演示文稿工具 | [slidevjs/slidev](https://github.com/slidevjs/slidev) |
| [tsdown](skills/tsdown) (Official) | tsdown - 基于 Rolldown 的 TypeScript 库打包工具 | [rolldown/tsdown](https://github.com/rolldown/tsdown) |
| [turborepo](skills/turborepo) (Official) | Turborepo - 高性能 monorepo 构建系统 | [vercel/turborepo](https://github.com/vercel/turborepo) |
| [vueuse-functions](skills/vueuse-functions) (Official) | VueUse - 200+ Vue 组合式工具函数 | [vueuse/skills](https://github.com/vueuse/skills) |
| [vue-best-practices](skills/vue-best-practices) | Vue 3 + TypeScript 最佳实践 | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [vue-router-best-practices](skills/vue-router-best-practices) | Vue Router 最佳实践 | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [vue-testing-best-practices](skills/vue-testing-best-practices) | Vue 测试最佳实践 | [vuejs-ai/skills](https://github.com/vuejs-ai/skills) |
| [web-design-guidelines](skills/web-design-guidelines) | Web 界面设计规范审查 | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) |

## FAQ

### What Makes This Collection Different?

This collection is opinionated, but the key difference is that it uses git submodules to directly reference source documentation. This provides more reliable context and allows the skills to stay up-to-date with upstream changes over time. If you primarily work with Vue/Vite/Nuxt, this aims to be a comprehensive one-stop collection.

The project is also designed to be flexible - you can use it as a template to generate your own skills collection.

### Skills vs llms.txt vs AGENTS.md

To me, the value of skills lies in being **shareable** and **on-demand**.

Being shareable makes prompts easier to manage and reuse across projects. Being on-demand means skills can be pulled in as needed, scaling far beyond what any agent's context window could fit at once.

You might hear people say "AGENTS.md outperforms skills". I think that's true — AGENTS.md loads everything upfront, so agents always respect it, whereas skills can have false negatives where agents don't pull them in when you'd expect. That said, I see this more as a gap in tooling and integration that will improve over time. Skills are really just a standardized format for agents to consume—plain markdown files at the end of the day. Think of them as a knowledge base for agents. If you want certain skills to always apply, you can reference them directly in your AGENTS.md.

## Generate Your Own Skills

Fork this project to create your own customized skill collection.

1. Fork or clone this repository
2. Install dependencies: `pnpm install`
3. Update `meta.ts` with your own projects and skill sources
4. Run `pnpm start cleanup` to remove existing submodules and skills
5. Run `pnpm start init` to clone the submodules
6. Run `pnpm start sync` to sync vendored skills
7. Ask your agent to `Generate skills for <project>` (recommended one at a time to manage token usage)

See [AGENTS.md](AGENTS.md) for detailed generation guidelines.

## License

Skills and the scripts in this repository are [MIT](LICENSE.md) licensed.

Vendored skills from external repositories retain their original licenses - see each skill directory for details.
