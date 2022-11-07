<script setup>
const runtimeConfig = useRuntimeConfig();

const { error, data: partnersPage } = await useFetch(
  () => `/api/partners-page?populate=*`,
  { baseURL: runtimeConfig.apiURL }
);

import { ref } from "vue";
const seo = ref(null);
const logo = ref(null)

if (!error.value) {
  seo.value = partnersPage.value.data.attributes.seo;
  logo.value = partnersPage.value.data.attributes.logo.data;
}
</script>

<template>
  <section class="text-sectn animate">
    <Head v-if="seo">
      <Title>{{ seo.metaTitle }}</Title>
      <Meta
        name="description"
        :content="seo.metaDescription"
        v-if="seo.metaDescription"
      />
      <Meta name="keywords" :content="seo.keywords" v-if="seo.keywords"></Meta>
    </Head>

    <div class="container">
      <div class="row">
        <div class="col-12 avalon-title">
          <h2>Партнеры</h2>
          <div class="line-ttl"></div>
        </div>
        <div
          class="col-12"
          v-if="!error"
          v-html="partnersPage.data.attributes.description"
        ></div>
        <div class="text__prtners" v-if="!error">
          <img
            v-for="(item, index) in logo"
            :key="index"
            :src="
              $config.public.apiURL + item.attributes.url
            "
            alt=""
          />
        </div>
        <div class="text__prtners" v-else>
          <h2>Загрузка...</h2>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss">
.text__prtners {
  justify-content: start;
  flex-wrap: wrap;
  gap: 30px;
  img {
    margin-bottom: 0;
  }
}
</style>