<script setup>
const modal = useModal();
const openModal = () => {
  modal.value = true;
};
const runtimeConfig = useRuntimeConfig();

const { error, data: service } = await useFetch(
  `${runtimeConfig.apiURL}/api/service-page?populate=seo`
);

import { ref } from "vue";
const seo = ref(null);
if (!error.value) {
  seo.value = service.value.data.attributes.seo;
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

    <section class="text-sectn animate pb-100">
      <div class="container">
        <div class="row">
          <div class="col-12 avalon-title">
            <h2>Сервис</h2>
          </div>
          <div class="col-12">
            <div
              class="page-content"
              v-if="!error"
              v-html="service.data.attributes.content"
            ></div>
          </div>
          <div class="col-12 text__btn-sect">
            <a href="#" class="btn text__btn" @click.prevent="openModal"
              >Записаться</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss">
.page-content {
  img {
    width: 100%;
  }
}
</style>