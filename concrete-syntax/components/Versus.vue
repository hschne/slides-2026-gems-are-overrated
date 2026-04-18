<script setup lang="ts">
import { computed } from 'vue'
import IconHammer from '~icons/lucide/hammer'
import IconGem from '~icons/lucide/gem'
import IconGitFork from '~icons/lucide/git-fork'
import IconPackage from '~icons/lucide/package'
import IconCopy from '~icons/lucide/copy'
import IconCode from '~icons/lucide/code'

type VersusItem = {
  icon: string
  color: string
}

const props = withDefaults(defineProps<{
  items?: VersusItem[]
  separator?: string
}>(), {
  items: () => [
    { icon: 'hammer', color: '#F69D50' },
    { icon: 'gem', color: '#6CB6FF' },
  ],
  separator: '',
})

const iconMap = {
  hammer: IconHammer,
  gem: IconGem,
  'git-fork': IconGitFork,
  package: IconPackage,
  copy: IconCopy,
} as const

const normalizedItems = computed(() =>
  props.items.map((item) => {
    const iconKey = item.icon.trim().toLowerCase()

    return {
      ...item,
      iconKey,
      iconComponent: iconMap[iconKey as keyof typeof iconMap] ?? IconCode,
    }
  }),
)

const itemCount = computed(() => Math.max(normalizedItems.value.length, 2))

const rootStyle = computed(() => {
  const n = itemCount.value
  const max = Math.max(160, 320 - (n - 2) * 65)
  const min = Math.max(100, 180 - (n - 2) * 28)
  const vw = Math.max(10, 22 - (n - 2) * 3)
  const gapMax = Math.max(1, 3.6 - (n - 2) * 0.45)
  const gapVw = Math.max(1.2, 5 - (n - 2) * 0.7)

  return {
    '--versus-size': `clamp(${min}px, ${vw}vw, ${max}px)`,
    '--versus-gap': `clamp(0.7rem, ${gapVw}vw, ${gapMax}rem)`,
    '--versus-label-size': `clamp(1.8rem, ${Math.max(2, 4.8 - (n - 2) * 0.6)}vw, ${Math.max(2, 4 - (n - 2) * 0.4)}rem)`,
  }
})
</script>

<template>
  <div class="versus" :style="rootStyle">
    <template v-for="(item, index) in normalizedItems" :key="`${item.iconKey}-${index}`">
      <div class="badge" :aria-label="item.iconKey">
        <div class="badge-mid">
          <div class="badge-inner icon-wrap" :style="{ color: item.color }">
            <component :is="item.iconComponent" class="icon" />
          </div>
        </div>
      </div>

      <div v-if="props.separator && index < normalizedItems.length - 1" class="versus-label">{{ props.separator }}</div>
    </template>
  </div>
</template>

<style scoped>
.versus {
  width: 100%;
  min-height: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: var(--versus-gap);
  padding: 1rem 0;
}

.badge {
  width: var(--versus-size);
  aspect-ratio: 1 / 1;
  border: 6px solid color-mix(in srgb, var(--cs-foreground) 95%, white);
  border-radius: 9999px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
}

.badge-mid {
  width: 84%;
  height: 84%;
  border: 3px solid color-mix(in srgb, var(--cs-foreground) 95%, white);
  border-radius: 9999px;
  display: grid;
  place-items: center;
}

.badge-inner {
  width: 82%;
  height: 82%;
  border-radius: 9999px;
  display: grid;
  place-items: center;
}

.icon-wrap {
  color: currentColor;
}

.icon,
.icon-wrap :deep(svg) {
  width: 52%;
  height: 52%;
  color: currentColor;
  stroke-width: 2.4;
}

.versus-label {
  font-family: 'Big Shoulders Display', sans-serif;
  color: color-mix(in srgb, var(--cs-foreground) 92%, white);
  font-size: var(--versus-label-size);
  font-weight: 800;
  letter-spacing: 0.04em;
  flex: 0 0 auto;
}
</style>
