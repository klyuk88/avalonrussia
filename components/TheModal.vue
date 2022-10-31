<script setup>
const modal = useModal();
const modelText = useModalText();
const closeModal = () => {
  modal.value = false;
};
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
      <form class="popup__form frm-avln">
        <!-- Hidden Required Fields -->
        <input type="hidden" name="project_name" value="MangataMarine" />
        <input type="hidden" name="admin_email" value="klyukovskiy@yandex.ru" />
        <input type="hidden" name="form_subject" value="заявка с сайта" />
        <!-- END Hidden Required Fields -->
        <input type="text" placeholder="Ваше имя" />
        <input type="text" placeholder="Телефон" />
        <div class="popup__button">
          <button class="frm-avln__button" type="submit">Отправить</button>
          <div class="conf">
            <input type="checkbox" class="custom-checkbox" id="conf" checked />
            <label for="conf"
              >Нажимая отправить, вы согласны с политикой
              конфиденциальности</label
            >
          </div>
        </div>
      </form>
    </div>
  </section>
  <div id="overlay" :class="{ active: modal }"></div>
</template>
<style lang="scss">
</style>