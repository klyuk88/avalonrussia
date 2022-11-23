<script setup>
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} ⏤ Понтонные катера премиум класса Avalon` : 'Понтонные катера премиум класса Avalon';
    }
  })
const agree = useCookie('agree-cookie')

</script>
<template>
  <div>
    <TheModal />
    <TheLoader />
    <TheHeader />
    <NuxtLoadingIndicator :color="`#c2a06e`" />
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

