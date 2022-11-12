<script setup>
import { reactive } from 'vue'
const modal = useModal();
const modelText = useModalText();
const closeModal = () => {
  modal.value = false;
};
const form = reactive({
  subject: "Из попап окна",
  name: null,
  phone: null,
  agree: true,
  
})
const sendForm = async () => {
  try {
    const res = await useFetch(`/api/send`, {
      method: "post",
      body: form
    })
    await navigateTo("/thanks")
    closeModal()
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <section class="modal" :class="{ active: modal }" id="modal">
    <div class="modal-header">
      <h3 class="title">{{ modelText.title }}</h3>
      <button class="close-button" @click="closeModal">
        <img src="@/assets/img/close.svg" alt="close" />
      </button>
    </div>
    <div class="modal-body">
      <p>
        {{ modelText.subTitle }}
      </p>
      <form class="popup__form frm-avln" @submit.prevent="sendForm">
        <input type="text" placeholder="Ваше имя" v-model="form.name" required/>
        <ClientOnly>
           <input type="tel" v-maska="'+7(###) ### ## ##'" placeholder="Телефон" v-model="form.phone" required/>
        </ClientOnly>
       
        <div class="popup__button">
          <button class="frm-avln__button" type="submit">Отправить</button>
          <div class="conf">
            <input type="checkbox" class="custom-checkbox" id="conf" v-model="form.agree" required/>
            <label for="conf">Согласен(а) с политикой конфиденциальности</label>
          </div>
        </div>
      </form>
    </div>
  </section>
  <div id="overlay" :class="{ active: modal }"></div>
</template>
<style lang="scss">

</style>