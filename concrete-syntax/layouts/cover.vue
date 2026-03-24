<template>
  <div class="slidev-layout cover">
    <!-- Accent mark -->
    <div class="accent-mark" />
    <!-- Main content -->
    <div class="cover-content">
      <slot />
    </div>
    <!-- Footer label -->
    <div class="cover-footer">
      <span class="cover-footer-label">// concrete syntax</span>
    </div>
  </div>
</template>

<style scoped>
.slidev-layout.cover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 3rem 4rem;
  background-color: var(--cs-background);
  position: relative;
}

.accent-mark {
  position: absolute;
  top: 2.5rem;
  left: 4rem;
  width: 2rem;
  height: 2px;
  background-color: var(--cs-primary);
}

.cover-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cover-footer {
  position: absolute;
  bottom: 2rem;
  left: 4rem;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  color: var(--cs-dim);
}
</style>
