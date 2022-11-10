<script setup>
import { ref, reactive } from "vue";
const runtimeConfig = useRuntimeConfig();
const seo = ref(null);
const { error, data } = await useFetch(`/api/contacts-page?populate=seo`, {
  baseURL: runtimeConfig.apiURL,
});
if (!error.value) {
  seo.value = data.value.data.attributes.seo;
}
const contacts = await useContacts();
const form = reactive({
  name: null,
  phone: null,
  email: null,
  message: null,
  subject: "Заявка из формы контактов",
});

const sendForm = async () => {
  try {
    const res = await useFetch(`/api/send`, {
      method: "post",
      body: form,
    });
    navigateTo("/thanks");
  } catch (error) {
    console.log(error);
  }
};
</script>
<template>
  <div class="contacts-page">
    <Head v-if="seo">
      <Title>{{ seo.metaTitle }}</Title>
      <Meta
        name="description"
        :content="seo.metaDescription"
        v-if="seo.metaDescription"
      />
      <Meta name="keywords" :content="seo.keywords" v-if="seo.keywords"></Meta>
    </Head>
    <section class="data-cntct animate">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 data-cntct__title">
            <h2>Свяжитесь с нами</h2>
            <p>
              Часы работы: <br />
              пн-пт ⏤ с 9 до 18
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
            <div class="row">
              <div class="col-md-6">
                <p>
                  <span class="contacts-adress-title">Главный офис</span><br />
                  {{ contacts.adressOffice }}
                </p>
              </div>
              <div class="col-md-6">
                <p>
                  <span class="contacts-adress-title">Торговая площадка</span
                  ><br />
                  {{ contacts.adressSelling }}
                </p>
              </div>
            </div>

            <div class="cntct_container">
              <div>
                <h4>Телефон</h4>
                <a :href="`tel:+${contacts.phoneOffice}`">{{
                  contacts.phoneSelling
                }}</a
                ><br /><br />
                <a :href="`tel:+${contacts.phoneOffice}`">{{
                  contacts.phoneOffice
                }}</a>
              </div>
              <div>
                <h4>Email</h4>
                <a :href="`mailto:${contacts.email}`">{{ contacts.email }}</a>
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
            <form class="form-container" @submit.prevent="sendForm">
              <label for="username">Имя</label>
              <input id="username" placeholder="ваше имя" v-model="form.name" />
              <label for="email">E-mail</label>
              <input id="email" placeholder="ваш email" v-model="form.email" />
              <label for="phone">Телефон</label>
              <ClientOnly>
                <input
                  id="phone"
                  placeholder="ваш телефон"
                  v-model="form.message"
                  v-maska="'+7(###)###-##-##'"
                />
              </ClientOnly>
              <textarea
                placeholder="Напишите ваше сообщение"
                id="message"
              ></textarea>
              <button type="submit">Отправить</button>
              <p class="form-agree-text">
                Отправляя форму, согласен(а) с
                <a href="/privacy-policy">политикой конфиденциальности</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
.contacts-adress-title {
  font-size: 16px;
  font-weight: 400;
}

.form-agree-text {
  margin-top: 20px;
  font-size: 15px;
  a {
    text-decoration: underline;
  }
  a:hover {
    color: #fff;
  }
}
</style>