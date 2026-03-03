export interface VendorSkillMeta {
  official?: boolean
  source: string
  skills: Record<string, string> // sourceSkillName -> outputSkillName
}

/**
 * Repositories to clone as submodules and generate skills from source
 */
export const submodules = {
  vue: 'https://github.com/vuejs/docs',
  nuxt: 'https://github.com/nuxt/nuxt',
  vite: 'https://github.com/vitejs/vite',
  pnpm: 'https://github.com/pnpm/pnpm.io',
  pinia: 'https://github.com/vuejs/pinia',
  vitest: 'https://github.com/vitest-dev/vitest',
  vitepress: 'https://github.com/vuejs/vitepress',
  vben: 'https://github.com/vbenjs/vue-vben-admin',
  tailwindcss: 'https://github.com/tailwindlabs/tailwindcss.com',
}

/**
 * Already generated skills, sync with their `skills/` directory
 */
export const vendors: Record<string, VendorSkillMeta> = {
  'slidev': {
    official: true,
    source: 'https://github.com/slidevjs/slidev',
    skills: {
      slidev: 'slidev',
    },
  },
  'vueuse': {
    official: true,
    source: 'https://github.com/vueuse/skills',
    skills: {
      'vueuse-functions': 'vueuse-functions',
    },
  },
  'tsdown': {
    official: true,
    source: 'https://github.com/rolldown/tsdown',
    skills: {
      tsdown: 'tsdown',
    },
  },
  'vuejs-ai': {
    source: 'https://github.com/vuejs-ai/skills',
    skills: {
      'vue-best-practices': 'vue-best-practices',
      'vue-router-best-practices': 'vue-router-best-practices',
      'vue-testing-best-practices': 'vue-testing-best-practices',
    },
  },
  'turborepo': {
    official: true,
    source: 'https://github.com/vercel/turborepo',
    skills: {
      turborepo: 'turborepo',
    },
  },
  'web-design-guidelines': {
    source: 'https://github.com/vercel-labs/agent-skills',
    skills: {
      'web-design-guidelines': 'web-design-guidelines',
    },
  },
}

/**
 * Hand-written skills with xingyu's preferences/tastes/recommendations
 */
export const manual = [
  'xingyu',
]
