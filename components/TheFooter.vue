<script setup>
import { ref } from 'vue'
const contacts = await useContacts();
</script>

<template>
  <footer class="ftr">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 col-md-3 ftr__logo">
          <img src="@/assets/img/AvalonLogoGold.svg" alt="AvalonLogoGold" />
        </div>
        <div class="col-sm-8 col-md-9">
          <ul class="ftr__contact">
            <li>
              <a :href="`mailto:${contacts.email}`">{{ contacts.email }}</a>
            </li>
            <li>
              <a :href="`tel:${contacts.phoneOffice}`">{{
                contacts.phoneOffice
              }}</a>
            </li>
            <li>
              <a :href="`tel:${contacts.phoneSelling}`">{{
                contacts.phoneSelling
              }}</a>
            </li>
          </ul>
        </div>
        <nav class="col-12">
          <ul class="ftr__link">
            <TheNav />
          </ul>
        </nav>
        <div class="col-12 ftr__cprtn">
          <p>2023, Avalonrussia</p>
          <p>
            <NuxtLink to="/privacy-policy"
              >Политика конфиденциальности</NuxtLink
            >
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
</script>
<style lang="scss">
.ftr {
  margin: 0;
}
@media screen and (max-width: 576px) {
  .ftr__contact {
    flex-wrap: wrap;
  }
}
</style>