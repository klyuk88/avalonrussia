<script setup>
const runtimeConfig = useRuntimeConfig()
const {error, data: partners} = useFetch( () => `/api/partners?populate[logo][fields][0]=url`, {baseURL: runtimeConfig.apiURL} )

const {error: errorPartnersPage, data: partnersPage} = useFetch( () => `/api/partners-page`, {baseURL: runtimeConfig.apiURL})

useHead({
    title: 'Партнеры'
})

</script>

<template>
      <section class="text-sectn animate">
        <div class="container">
            <div class="row">
                <div class="col-12 avalon-title">
                    <h2>Партнеры</h2>
                    <div class="line-ttl"></div>
                </div>
                <div class="col-12" v-if="!errorPartnersPage" v-html="partnersPage.data.attributes.description" > 
                </div>
                <div class="text__prtners" v-if="!error">
                    <img v-for="(item, index) in partners.data" :key="index" :src="$config.public.apiURL + item.attributes.logo.data.attributes.url" alt="">
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