<script setup lang="ts">
const props = defineProps<{
  images: string[]
}>()

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// Divide the usable canvas into a grid, one cell per image.
// Usable area: left 10-90%, top 40-85% (clears the header).
// Tilt alternates by column so neighbours lean away from each other.
const LEFT = { min: 5, max: 95}
const TOP  = { min: 35, max: 90 }
const JITTER = 0.3 

const cols = Math.ceil(Math.sqrt(props.images.length))
const rows = Math.ceil(props.images.length / cols)

const positions = props.images.map((_, i) => {
  const col = i % cols
  const row = Math.floor(i / cols)

  const cellW = (LEFT.max - LEFT.min) / cols
  const cellH = (TOP.max  - TOP.min)  / rows

  const cellCX = LEFT.min + (col + 0.5) * cellW
  const cellCY = TOP.min  + (row + 0.5) * cellH

  const left   = cellCX + rand(-cellW * JITTER / 2, cellW * JITTER / 2)
  const top    = cellCY + rand(-cellH * JITTER / 2, cellH * JITTER / 2)

  const tiltSign = col % 2 === 0 ? -1 : 1
  const rotate   = tiltSign * rand(3, 8)

  return {
    top: `${Math.round(top)}%`,
    left: `${Math.round(left)}%`,
    transform: `rotate(${rotate.toFixed(1)}deg) translate(-50%, -50%)`,
  }
})
</script>

<template>
  <div class="photo-pile">
    <div
      v-for="(src, i) in images"
      :key="src"
      v-click
      class="photo-pile-item"
      :style="{ top: positions[i % positions.length].top, left: positions[i % positions.length].left, transform: positions[i % positions.length].transform, zIndex: i + 1 }"
    >
      <img :src="src" :alt="`image ${i + 1}`" />
    </div>
  </div>
</template>

<style scoped>
.photo-pile {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.photo-pile-item {
  position: absolute;
  transform-origin: center center;
  box-shadow: 4px 6px 24px rgba(0, 0, 0, 0.45);
  border: 2px solid white;

  /* Override Slidev's default v-click fade — we want a drop-in */
  transition: opacity 100ms ease, scale 250ms cubic-bezier(0.22, 1, 0.36, 1), translate 250ms cubic-bezier(0.22, 1, 0.36, 1) !important;
}

/* Hidden state (before click) */
.photo-pile-item.slidev-vclick-hidden {
  opacity: 0;
  scale: 0.92;
}

/* Visible state (after click) */
.photo-pile-item:not(.slidev-vclick-hidden) {
  opacity: 1;
  scale: 1;
}

.photo-pile-item img {
  display: block;
  /* Slide canvas is 980x552px — keep images well within bounds */
  max-width: 480px;
  max-height: 340px;
  width: auto;
  height: auto;
  object-fit: contain;
}
</style>
