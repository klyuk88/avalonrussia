<script setup>
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
    slug: "/boats-in-stock",
    title: "Катера в налчии",
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
      <NuxtLink
        :to="item.slug"
        class="nav-lnk"
        :class="{ active: route.path === item.slug ? true : false }"
      >
        {{ item.title }}
      </NuxtLink>
    </li>
</template>

<style lang="scss">
.nav-lnk.active {
  color: #c2a06e;
}
</style>