<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const { error, data: news } = await useFetch(
  `${runtimeConfig.apiURL}/api/news?filters[slug][$eq]=${route.params.slug}&populate=seo`
);

if(!error.value && news.value.data[0].attributes.seo !== null) {
useHead({
  title: news.value.data[0].attributes.seo.metaTitle,
  meta: [{ name: "description", content: news.value.data[0].attributes.seo.metaDescription }],
});
}



</script>


<template>
  <div>
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