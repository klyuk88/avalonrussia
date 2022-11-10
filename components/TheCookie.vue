<script setup>
import { ref } from 'vue'
const agree = useCookie('agree-cookie', {
  maxAge: 3600 * 24
})
const agreeLocal = ref(false)
const setCookie = () => {
  agree.value = true
  agreeLocal.value = true
}
</script>
<template>
<div>
  <div class="cookie" v-if="!agreeLocal && !agree">
    <p class="cookie-text">
      Продолжая использовать наш сайт, вы даете <a href="/privacy-policy">согласие на обработку файлов cookie</a>, которые обеспечивают правильную работу сайта.
    </p>
    <a href="#" class="btn cookie-btn" @click.prevent="setCookie">Ок</a>
  </div>
</div>

</template>

<style lang="scss">
.cookie {
  position: fixed;
  bottom: 0;
  max-width: 600px;
  width: 600px;
  padding: 15px;
  // border: 1px solid #c2a06e;
  background: #fff;
  display: flex;
  align-items: center;
  z-index: 1000;
  right: 0;
  &-text {
    font-size: 14px;
    font-weight: 300;
    line-height: 1.5;
    color: #111;
    a {
      color: #c2a06e;
    }
  }
  &-btn {
    padding: 5px 15px;
    border-color: #111;
    background: #c2a06e;
  }
  &-btn:hover {
    background: #c2a06e;
  }
}

@media screen and (max-width: 768px) {
    .cookie {
      width: 100%;
      
    }
}
</style>