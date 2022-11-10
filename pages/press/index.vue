<script setup>
import { ref } from "vue";
const runtimeConfig = useRuntimeConfig();
const { error: errorNews, data: news } = await useFetch(
  () =>
    `/api/news?populate[thumbnail][fields][0]=url&fields[0]=title&fields[1]=slug&fields[2]=previewtext`,
  { baseURL: runtimeConfig.apiURL }
);
const { error: singleNewsError, data: singleNewsData } = await useFetch(
  `/api/news-page?populate=seo`,
  { baseURL: runtimeConfig.apiURL }
);
const seo = ref(null);
if (!singleNewsError.value) {
  seo.value = singleNewsData.value.data.attributes.seo;
}
</script>

<template>
  <section class="news-cntnt animate">
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
        <div class="col avalon-title">
          <span>Публикации</span>
          <h2>Катера, обзоры, истории,<br>новости</h2>
        </div>
        <div class="col avalon-title__text" v-if="seo.metaDescription">
          <p>
            Lorem ipsum dolor sit amet. Et assumenda eaque aut nesciunt ullam
            qui magni vitae vel consequatur
          </p>
        </div>

        <div class="col-12">
          <div class="line-ttl"></div>
        </div>
        <div class="row" v-if="!errorNews">
          <div class="col-md-6" v-for="(item, index) in news.data" :key="index">
            <a :href="`/press/${item.attributes.slug}`">
              <div class="nws-cntct">
                <img
                  v-if="item.attributes.thumbnail.data"
                  :src="
                    $config.public.apiURL +
                    item.attributes.thumbnail.data.attributes.url
                  "
                  alt=""
                />
                <h3>{{ item.attributes.title }}</h3>
                <p>{{ item.attributes.previewtext }}</p>
              </div>
            </a>
          </div>
        </div>
        <div class="row" v-else>
          <h2>Загрузка...</h2>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.nws-cntct {
  position: relative;
  z-index: 1;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    z-index: -1;
  }
}
.nws-cntct:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba($color: #000000, $alpha: 0.2);
  z-index: -1;
}

.nws-cntct:hover {
  outline: solid 3px #c2a06e;
}


</style>