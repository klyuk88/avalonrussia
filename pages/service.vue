<script setup>
const modal = useModal()
const openModal = () => {
  modal.value = true
}
const runtimeConfig = useRuntimeConfig()

const {error, data: service} = await useFetch(`${runtimeConfig.apiURL}/api/service-page?populate=seo`)

if(!error.value && service.value.data.attributes.seo !== null) {
useHead({
  title: service.value.data.attributes.seo.metaTitle,
  meta: [{ name: "description", content: service.value.data.attributes.seo.metaDescription }],
});
}
</script>
<template>
  <div>
    <section class="text-sectn animate">
      <div class="container">
        <div class="row">
          <div class="col-12 avalon-title">
            <h2>Сервис</h2>
          </div>
          <div class="col-12">
            <div class="page-content" v-if="!error" v-html="service.data.attributes.content" ></div>
          </div>
          <div class="col-12 text__btn-sect">
            <a href="#" class="btn text__btn" @click.prevent="openModal">Записаться</a>
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