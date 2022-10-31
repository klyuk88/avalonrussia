<script setup>
const mail = useMail();
const phone = usePhone();
const adress = useAdress();
const runtimeConfig = useRuntimeConfig();
const test = ref(false);

const { error: errorMainPage, data: mainPage } = await useFetch(
  runtimeConfig.apiURL + "/api/main-page"
);

if (!errorMainPage.value) {
  mail.value = mainPage.value.data.attributes.mail;
  phone.value = mainPage.value.data.attributes.phone;
  adress.value = mainPage.value.data.attributes.adress;
}

useHead({
    title: 'Контакты'
})
</script>
<template>
  <div>
    <section class="data-cntct animate">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 data-cntct__title">
            <h2>Свяжитесь с нами</h2>
            <p>
              Если вам все еще нужна помощь, пожалуйста, не стесняйтесь
              обращаться к нам по телефону
            </p>
            <div class="map-cntct">
              <client-only>
                <iframe
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3A95ad8c52d3ed4c2a33e353aebf30e4ab0a4e91e3206a1fe98fb8cd4654906fa3&amp;source=constructor"
                  width="100%"
                  height="400"
                  frameborder="0"
                ></iframe>
              </client-only>
            </div>
          </div>
          <div class="col-lg-6 data-cntct__data">
            <h3>Адрес</h3>
            <p>
              {{adress }}
            </p>
            <div class="cntct_container">
              <div>
                <h4>Телефон</h4>
                <a :href="`tel:+${phone}`">{{phone}}</a>
              </div>
              <div>
                <h4>Email</h4>
                <a :href="`mailto:${mail}`">{{
                  mail
                }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="form-cntct animate">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <form class="form-container">
              <!-- Hidden Required Fields -->
              <input type="hidden" name="project_name" value="MangataMarine" />
              <input
                type="hidden"
                name="admin_email"
                value="klyukovskiy@yandex.ru"
              />
              <input type="hidden" name="form_subject" value="заявка с сайта" />
              <!-- END Hidden Required Fields -->
              <label for="username">Имя</label>
              <input id="username" placeholder="ваше имя" />
              <label for="email">E-mail</label>
              <input id="email" placeholder="ваш email" />
              <label for="phone">Телефон</label>
              <input id="phone" placeholder="ваш телефон" />
              <textarea
                placeholder="Напишите ваше сообщение"
                id="message"
              ></textarea>
              <button type="submit">Отправить</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>