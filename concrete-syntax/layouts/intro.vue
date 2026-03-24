<template>
  <div class="slidev-layout intro">
    <div class="intro-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.slidev-layout.intro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 3rem 4rem;
  background-color: var(--cs-background);
}

.intro-content {
  max-width: 680px;
}
</style>
