<script setup>
const config = useRuntimeConfig();
const { data: boats } = await useFetch(
  "/api/boats?filters[instock][$eq]=true&populate=*",
  {
    baseURL: config.public.apiURL,
  }
);

</script>

<template>
  <section class="text-sectn animate catalog pb-100">
    <div class="container">
      <div class="row">
        <div class="col-12 avalon-title">
          <h2>Катера в наличии</h2>
          <div class="line-ttl"></div>
          <h4 class="find-models-count">
            Найдено моделей {{ boats.meta.pagination.total }}
          </h4>
        </div>
      </div>
      <div class="row mt-5" v-if="boats.data.length > 0">
        <div class="col-md-4" v-for="(item, index) in boats.data" :key="index">
          <NuxtLink :to="'/boats-in-stock/' + item.attributes.slug">
            <div class="ctlg-cont__block">
              <div class="ctlg-cont__block-title">
                <h3>{{ item.attributes.title }}</h3>
                <img src="@/assets/img/arrow.svg" alt="" />
              </div>
              <img
                :src="
                  $config.public.apiURL +
                  item.attributes.thumbnail.data.attributes.url
                "
                alt=""
              />
            </div>
          </NuxtLink>
        </div>
      </div>
      <h2 v-else>
        Пока что нет подходящих моделей...
      </h2>
    </div>
  </section>
</template>