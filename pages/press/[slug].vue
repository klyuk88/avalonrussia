<script setup>
import { ref } from "vue";
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { error, data: news } = await useFetch(
  `${runtimeConfig.apiURL}/api/news?filters[slug][$eq]=${route.params.slug}&populate=seo`
);

const seo = ref(null);
if (!error.value) {
  seo.value = news.value.data[0].attributes.seo
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
        <div class="row" v-if="!error">
          <div class="col-12 avalon-title">
            <h2>{{ news.data[0].attributes.title }}</h2>
            <div class="line-ttl"></div>
          </div>
          <div class="col-12">
            <div
              v-html="news.data[0].attributes.content"
              class="news-content"
            ></div>
          </div>
        </div>
        <div v-else>
          <h2>Скоро тут будет интересная статья...</h2>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss">
.news-content {
  img {
    width: 100%;
  }
}
</style>