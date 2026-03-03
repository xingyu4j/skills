---
name: tailwind-theme-builder
description: >
  Set up Tailwind v4 with shadcn-vue themed UI. Workflow: install dependencies,
  configure CSS variables with @theme inline, set up dark mode, verify.
  Use when initialising React projects with Tailwind v4, setting up shadcn-vue theming,
  or fixing colors not working, tw-animate-css errors, @theme inline dark mode conflicts,
  @apply breaking, v3 migration issues.
---

# Tailwind Theme Builder

Set up a fully themed Tailwind v4 + shadcn-vue project with dark mode. Produces configured CSS, theme provider, and working component library.

## Workflow

### Step 1: Install Dependencies

```bash
pnpm add tailwindcss @tailwindcss/vite
pnpm add -D @types/node tw-animate-css
pnpm dlx shadcn-vue@latest init

# Delete v3 config if it exists
rm -f tailwind.config.ts
```

### Step 2: Configure Vite

Copy `assets/vite.config.ts` or add the Tailwind plugin:

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } }
})
```

### Step 3: Four-Step CSS Architecture (Mandatory)

This exact order is required. Skipping steps breaks the theme.

**src/index.css:**

```css
@import "tailwindcss";
@import "tw-animate-css";
@custom-variant dark (&:is(.dark *));
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

**Result:** `bg-background`, `text-primary` etc. work automatically. Dark mode switches via `.dark` class — no `dark:` variants needed for semantic colours.

### Step 4: Set Up Dark Mode

Copy `assets/ModeToggle.vue` to your components directory, then wrap your app:

Add a theme toggle:
```bash
pnpm dlx shadcn-vue@latest add dropdown-menu
```

See `references/dark-mode.md` for the ModeToggle component.

### Step 5: Configure components.json

```json
{
  "tailwind": {
    "config": "",
    "css": "src/assets/index.css",
    "baseColor": "slate",
    "cssVariables": true
  }
}
```

`"config": ""` is critical — v4 doesn't use tailwind.config.ts.

---

## Critical Rules

**Always:**
- Wrap colours with `hsl()` in `:root`/`.dark`
- Use `@theme inline` to map all CSS variables
- Use `@tailwindcss/vite` plugin (NOT PostCSS)
- Delete `tailwind.config.ts` if it exists

**Never:**
- Put `:root`/`.dark` inside `@layer base`
- Use `.dark { @theme { } }` (v4 doesn't support nested @theme)
- Double-wrap: `hsl(var(--background))`
- Use `@apply` with `@layer base` classes (use `@utility` instead)

---

## Common Errors

| Symptom | Cause | Fix |
|---------|-------|-----|
| `bg-primary` doesn't work | Missing `@theme inline` | Add `@theme inline` block |
| Colours all black/white | Double `hsl()` wrapping | Use `var(--colour)` not `hsl(var(--colour))` |
| Dark mode not switching | Missing ThemeProvider | Wrap app in `<ThemeProvider>` |
| Build fails | `tailwind.config.ts` exists | Delete the file |
| Animation errors | Using `tailwindcss-animate` | Install `tw-animate-css` instead |
| `@apply` fails on custom class | v4 breaking change | Use `@utility` instead of `@layer components` |

See `references/common-gotchas.md` for detailed error explanations with sources.

---

## Asset Files

Copy from `assets/` directory:
- `index.css` — Complete CSS with all colour variables
- `components.json` — shadcn-vue v4 config
- `vite.config.ts` — Vite + Tailwind plugin
- `ModeToggle.vue` — Dark mode provider
- `utils.ts` — `cn()` utility

## Reference Files

- `references/common-gotchas.md` — 8 documented errors with GitHub sources
- `references/dark-mode.md` — Complete dark mode implementation
- `references/architecture.md` — Deep dive into 4-step pattern
- `references/migration-guide.md` — v3 to v4 migration
