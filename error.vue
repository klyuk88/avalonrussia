<script setup>
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>
<template>
  <TheHeader />
  <div class="section error">
    <div class="container">
      <h1>Ошибка {{error.statusCode}}</h1>
      <p>К сожалению возникла ошибка</p>
      <a class="btn" href="/" @click="handleError">На главную</a>
    </div>
  </div>

  <TheFooter />
</template>


<style lang="scss" scoped>
a.btn {
  padding: 10px 15px;
  margin-top: 50px;
  display: inline-block;
}
p {
  margin-top: 30px;
}

.section.error {
  padding: 100px 0;
}
  
</style>