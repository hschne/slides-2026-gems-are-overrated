<script setup lang="ts">
import IconWrench from '~icons/lucide/hammer'
import IconGem from '~icons/lucide/gem'
</script>

<template>
  <div class="vs-graphic">
    <div class="badge badge-custom" aria-label="Custom">
      <div class="badge-mid">
        <div class="badge-inner">
          <IconWrench class="icon" />
        </div>
      </div>
    </div>

    <div class="vs-label">VS</div>

    <div class="badge badge-gem" aria-label="Gem">
      <div class="badge-mid">
        <div class="badge-inner">
          <IconGem class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vs-graphic {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1.5rem, 5vw, 4.5rem);
  padding: 1rem 0;
}

.badge {
  width: clamp(220px, 22vw, 340px);
  aspect-ratio: 1 / 1;
  border: 3px solid color-mix(in srgb, var(--cs-foreground) 92%, white);
  border-radius: 9999px;
  display: grid;
  place-items: center;
}
.badge-mid {
  width: 84%;
  height: 84%;
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

.badge-custom .badge-mid {
  background: color-mix(in srgb, #F69D50 72%, transparent);
}
.badge-custom .badge-inner {
  background: #F69D50;
}

.badge-gem .badge-mid {
  background: color-mix(in srgb, #6CB6FF 72%, transparent);
}
.badge-gem .badge-inner {
  background: #6CB6FF;
}

.icon {
  width: 48%;
  height: 48%;
  color: color-mix(in srgb, var(--cs-foreground) 95%, white);
  stroke-width: 2.2;
}

.vs-label {
  font-family: 'Big Shoulders Display', sans-serif;
  color: color-mix(in srgb, var(--cs-foreground) 92%, white);
  font-size: clamp(2.25rem, 5vw, 4.2rem);
  font-weight: 800;
  letter-spacing: 0.04em;
}
</style>
