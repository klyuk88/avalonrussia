<script setup>
import { ref, onMounted } from "vue";
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { refresh, error, data: news } = await useFetch(
  () => `/api/news?filters[slug][$eq]=${route.params.slug}&populate=seo`,
  {baseURL: runtimeConfig.apiURL}
);

onMounted(async() => {
  await refresh()
})
</script>

<template>
  <div>
    <Head v-if="news.data[0].attributes.seo">
      <Title>{{ news.data[0].attributes.seo.metaTitle }}</Title>
      <Meta
        name="description"
        :content="news.data[0].attributes.seo.metaDescription"
        v-if="news.data[0].attributes.seo.metaDescription"
      />
      <Meta name="keywords" :content="news.data[0].attributes.seo.keywords" v-if="news.data[0].attributes.seo.keywords"></Meta>
    </Head>
    <section class="text-sectn animate pb-100">
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
  * {
    color: #fff!important;
  }
}
</style>