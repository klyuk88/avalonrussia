<script setup>
const runtimeConfig = useRuntimeConfig();
const { error, data: club } = await useFetch(
  `${runtimeConfig.apiURL}/api/club?populate=seo`
);
import { ref } from "vue";
const seo = ref(null);
if (!error.value) {
  seo.value = club.value.data.attributes.seo;
}
const form = reactive({
  subject: "Заявка в клуб",
  phone: null
})
const sendForm = async () => {
  try {
    const res = await useFetch(`/api/send`, {
      method: "post",
      body: form
    })
    await navigateTo("/thanks")
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div class="club-page">
    <Head v-if="seo">
      <Title>{{ seo.metaTitle }}</Title>
      <Meta
        name="description"
        :content="seo.metaDescription"
        v-if="seo.metaDescription"
      />
      <Meta name="keywords" :content="seo.keywords" v-if="seo.keywords"></Meta>
    </Head>
    <section class="animate club-section">
      <div class="club-section-overlay"></div>
      <img src="@/assets/img/club-bg.jpg" alt="" class="club-section-bg" />
      <div class="container">
        <div class="club-form">
          <h2 class="club-title">Вступить в клуб Avalon</h2>
          <form class="club-form form-club__form frm-avln" @submit.prevent="sendForm">
            <ClientOnly>
            <input type="tel" placeholder="Телефон" v-model="form.phone" v-maska="'+7 (###) ### ## ##'" required/>
            </ClientOnly>

            <button class="frm-avln__button" type="submit">Отправить</button>
            <p class="agree-text">Нажимая отправить согласен(а) с политикой конфиденциальности</p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.page-content {
  img {
    width: 100%;
  }
}
.club-section {
  height: 80vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .club-section-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: 1;
  }
  .club-section-overlay {
    background: rgba($color: #000000, $alpha: 0.6);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 2;
  }
  .club-form {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 50px;
    @media (max-width: 576px) {
      margin-top: 25px;
      width: 100%;
    }
  }
  .club-title {
    font-size: 46px;
    color: #fff;
    @media (max-width: 576px) {
      font-size: 30px;
      font-weight: 600;
    }
  }
  .frm-avln input {
    width: 400px;
    margin-bottom: 50px;
    border-bottom: 2px solid rgba($color: #fff, $alpha: 0.7);
    @media (max-width: 576px) {
      margin-bottom: 25px;
      width: 100%;
    }
  }
}
.club-page + footer {
  margin-top: 0;
}

.agree-text {
  font-size: 14px;
  color: #fff;
  margin-top: 30px;
}
</style>