<script setup>
import { useNav } from '@slidev/client'
const { currentSlideRoute } = useNav()
const hiddenLayouts = ['cover', 'image', 'image-left', 'image-right']
</script>

<template>
  <Transition name="fade">
    <footer
      v-if="!hiddenLayouts.includes(currentSlideRoute.meta?.layout) && currentSlideRoute.meta?.slide?.frontmatter?.footer !== false"
      class="absolute bottom-0 left-0 right-0 flex justify-between items-center px-10 py-3 text-xs"
      style="color: var(--cs-dim); font-family: 'IBM Plex Mono', monospace"
    >
      <span>MUNICH RUBYSHIFT · APRIL 23, 2026</span>
      <a href="https://bsky.app/profile/hansschnedlitz.bsky.social" target="_blank" style="color: inherit; text-decoration: none;">HANS SCHNEDLITZ · @HSCHNE</a>
    </footer>
  </Transition>
</template>
