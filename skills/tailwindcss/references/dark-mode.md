# Dark Mode Implementation

## Overview

Tailwind v4 + shadcn-vue dark mode requires:
1. `@vueuse/core` install @vueuse/core pnpm add @vueuse/core
2. Optional, to include icons for theme button. pnpm add -D @iconify/vue @iconify-json/radix-icons
3. Add a mode toggle

---

## ThemeProvider Component

### Full Implementation

```typescript
// src/components/ModeToggle.vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Pass { disableTransition: false } to enable transitions
const mode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline">
        <Icon icon="radix-icons:moon" class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Icon icon="radix-icons:sun" class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="mode = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

```

---

## How It Works

### Theme Flow

```
User selects theme → setTheme() called
  ↓
Save to localStorage
  ↓
Update state
  ↓
useEffect triggers
  ↓
Remove existing classes (.light, .dark)
  ↓
Add new class to <html>
  ↓
CSS variables update (.dark overrides :root)
  ↓
UI updates automatically
```

### System Theme Detection

```typescript
if (theme === 'system') {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    .matches ? 'dark' : 'light'
  root.classList.add(systemTheme)
}
```

This respects the user's OS preference when "System" is selected.

---

## Common Issues

### Issue: Dark mode not switching

**Cause:** Theme provider not wrapping app
**Fix:** Ensure `<ModeToggle>` is included in your app

### Issue: Theme resets on page refresh

**Cause:** localStorage not working
**Fix:** Check browser privacy settings, add sessionStorage fallback

### Issue: Flash of wrong theme on load

**Cause:** Theme applied after initial render
**Fix:** Add inline script to `index.html` (advanced)

### Issue: Icons not changing

**Cause:** CSS transitions not working
**Fix:** Verify icon classes use `dark:` variants for animations

---

## Testing Checklist

- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly
- [ ] System mode respects OS setting
- [ ] Theme persists after page refresh
- [ ] Toggle component shows current state
- [ ] All text has proper contrast
- [ ] No flash of wrong theme on load
- [ ] Works in incognito mode (graceful fallback)

---

## Official Documentation

- shadcn-vue Dark Mode (Vite): https://www.shadcn-vue.com/docs/dark-mode/vite
- Tailwind Dark Mode: https://tailwindcss.com/docs/dark-mode
