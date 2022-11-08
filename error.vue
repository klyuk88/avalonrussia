<script setup>
const props = defineProps({
  error: Object,
});
const handleError = () => clearError({ redirect: "/" });
</script>
<template>
  <TheHeader />
  <section class="sec-404 animate">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 sec-404__image">
          <h1 class="error-title">{{error.statusCode}}</h1>
        </div>
        <div class="col-lg-5">
          <div class="sec-404__text">
            <p v-if="error.statusCode === '404'">Страница не найдена</p>
            <p v-else>Возникла ошибка</p>
            <a class="avln_link" href="/" @click.prevent="handleError"
              >На главную <img src="@/assets/img/right-arrv.svg" alt=""
            /></a>
          </div>
        </div>
      </div>
    </div>
  </section>
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

.error-title {
  font-weight: 900;
  font-size: 25rem;
  line-height: 1;
  background-image: url("@/assets/img/club-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>