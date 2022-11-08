<script setup>
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} ⏤ Avalon` : 'Понтонные катера премиум класса ⏤ Avalon';
    }
  })
const agree = useCookie('agree-cookie')

</script>
<template>
  <div>
    <TheModal />
    <TheLoader />
    <TheHeader />
    <NuxtPage />
    <TheCookie />
    <TheFooter />
  </div>
</template>

<style lang="scss">
html::-webkit-scrollbar-track {
  background: orange;
}
  
</style>

