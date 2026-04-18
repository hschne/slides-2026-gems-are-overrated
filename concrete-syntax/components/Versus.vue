<script setup lang="ts">
import { computed } from 'vue'
import IconHammer from '~icons/lucide/hammer'
import IconGem from '~icons/lucide/gem'

const props = withDefaults(defineProps<{
  leftColor?: string
  rightColor?: string
  leftLabel?: string
  rightLabel?: string
  text?: string
  size?: string
  gap?: string
}>(), {
  leftColor: '#F69D50',
  rightColor: '#6CB6FF',
  leftLabel: 'Left side',
  rightLabel: 'Right side',
  text: 'VS',
  size: 'clamp(220px, 22vw, 340px)',
  gap: 'clamp(1.5rem, 5vw, 4.5rem)',
})

const rootStyle = computed(() => ({
  '--versus-size': props.size,
  '--versus-gap': props.gap,
}))
</script>

<template>
  <div class="versus" :style="rootStyle">
    <div class="badge" :aria-label="leftLabel">
      <div class="badge-mid">
        <div class="badge-inner icon-wrap" :style="{ color: leftColor }">
          <slot name="left-icon">
            <IconHammer class="icon" />
          </slot>
        </div>
      </div>
    </div>

    <div class="versus-label">{{ text }}</div>

    <div class="badge" :aria-label="rightLabel">
      <div class="badge-mid">
        <div class="badge-inner icon-wrap" :style="{ color: rightColor }">
          <slot name="right-icon">
            <IconGem class="icon" />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.versus {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
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

.icon {
  width: 52%;
  height: 52%;
  stroke-width: 2.4;
}

.icon-wrap :deep(svg) {
  width: 52%;
  height: 52%;
  color: currentColor;
  stroke-width: 2.4;
}

.versus-label {
  font-family: 'Big Shoulders Display', sans-serif;
  color: color-mix(in srgb, var(--cs-foreground) 92%, white);
  font-size: clamp(2.1rem, 4.8vw, 4rem);
  font-weight: 800;
  letter-spacing: 0.04em;
}
</style>
