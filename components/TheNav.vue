<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const menu = ref([
  {
    slug: "/",
    title: "Главная",
  },
  {
    slug: "/about",
    title: "О компании",
  },
  {
    slug: "/catalog",
    title: "Каталог",
  },
  {
    slug: "/club",
    title: "Клуб",
  },
  {
    slug: "/service",
    title: "Сервис",
  },
  {
    slug: "/partners",
    title: "Партнеры",
  },
  {
    slug: "/press",
    title: "Пресса",
  },
  {
    slug: "/contacts",
    title: "Контакты",
  },
]);
</script>
<template>
  <li v-for="(item, index) in menu" :key="index">
    <a :href="item.slug" class="nav-lnk" :class="{active: route.path === item.slug ? true : false}">
      {{item.title}}
    </a>
  </li>
</template>

<style lang="scss">
.nav-lnk.active {
  color: #c2a06e
}
  
</style>