<script setup>
const runtimeConfig = useRuntimeConfig()
const {error, data: club} = useFetch(`${runtimeConfig.apiURL}/api/club`)

</script>
<template>
  <div>
    <section class="text-sectn animate">
      <div class="container">
        <div class="row">
          <div class="col-12 avalon-title">
            <h2>Клуб Avalon</h2>
            <div class="line-ttl"></div>
          </div>
          <div class="col-12">
            <div class="club-content page-content" v-if="!error" v-html="club.data.attributes.content"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="form-club animate">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="form-club__title avalon-title">
              <h2>Записаться в клуб</h2>
            </div>
          </div>
          <div class="col-12">
            <form class="form-club__form frm-avln">
              <!-- Hidden Required Fields -->
              <input type="hidden" name="project_name" value="MangataMarine" />
              <input
                type="hidden"
                name="admin_email"
                value="klyukovskiy@yandex.ru"
              />
              <input type="hidden" name="form_subject" value="заявка с сайта" />
              <!-- END Hidden Required Fields -->
              <input type="text" placeholder="Ваше имя" />
              <input type="text" placeholder="Телефон" />
              <button class="frm-avln__button" type="submit">Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.page-content {
  img {
    width: 100%;
  }
}
</style>