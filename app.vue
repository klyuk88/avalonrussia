<script setup>
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} ⏤ Avalon` : 'Понтонные катера премиум класса ⏤ Avalon';
    }
  })
</script>
<template>
  <div>
    <TheModal />
    <TheLoader />
    <TheHeader />
    <NuxtPage />
    <TheFooter />
  </div>
</template>

<style lang="scss">
html::-webkit-scrollbar-track {
  background: orange;
}
  
</style>

