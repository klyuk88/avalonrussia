<script setup>
const modal = useModal();
const openModal = () => {
  modal.value = true;
};
const runtimeConfig = useRuntimeConfig();
const { error, data: aboutPage } = await useFetch(
  () => `/api/about-page?populate=seo`,
  { baseURL: runtimeConfig.apiURL }
);

import { ref } from "vue";
const seo = ref(null);
if (!error.value) {
  seo.value = aboutPage.value.data.attributes.seo;
}
</script>
<template>
  <div>
    <Head v-if="seo">
      <Title>{{ seo.metaTitle }}</Title>
      <Meta
        name="description"
        :content="seo.metaDescription"
        v-if="seo.metaDescription"
      />
      <Meta name="keywords" :content="seo.keywords" v-if="seo.keywords"></Meta>
    </Head>
    <section class="text-sectn animate">
      <div class="container">
        <div class="row">
          <div class="col-12 avalon-title">
            <h2>О компании Avalon</h2>
            <div class="line-ttl"></div>
          </div>
          <div
            class="about-content"
            v-if="!error"
            v-html="aboutPage.data.attributes.content"
          ></div>
          <div class="col-12 text__btn-sect">
            <a href="#" class="btn text__btn" @click.prevent="openModal"
              >Задать вопрос</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss">
.crcl-btn {
  img {
    width: 30px;
    height: auto;
  }
}
.about-content {
  img {
    width: 100%;
  }
}
</style>