<script setup>
const modal = useModal()
const openModal = () => {
  modal.value = true
}
const runtimeConfig = useRuntimeConfig()
const {error, data: aboutPage} = await useFetch(() => `/api/about-page?populate=seo`, {baseURL: runtimeConfig.apiURL})


if(!error.value && aboutPage.value.data.attributes.seo !== null) {
useHead({
  title: aboutPage.value.data.attributes.seo.metaTitle,
  meta: [{ name: "description", content: aboutPage.value.data.attributes.seo.metaDescription }],
});
}

</script>
<template>
  <div>
    <section class="text-sectn animate">
      <div class="container">
        <div class="row">
          <div class="col-12 avalon-title">
            <h2>Avalon - ваш личный отдых</h2>
            <div class="line-ttl"></div>
          </div>
          <div class="about-content" v-if="!error" v-html="aboutPage.data.attributes.content">

          </div>
          <div class="col-12 text__btn-sect">
            <a href="#" class="btn text__btn" @click.prevent="openModal">Задать вопрос</a>
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