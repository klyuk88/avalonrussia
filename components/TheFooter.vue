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
              <a href="">{{ mail }}</a>
            </li>
            <li>
              <a href="">{{ phone }}</a>
            </li>
          </ul>
        </div>
        <nav class="col-12">
          <ul class="ftr__link">
            <TheNav/>
          </ul>
        </nav>
        <div class="col-12 ftr__cprtn">
          <p>2022, Avalon Rus</p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup>
const mail = useMail();
const phone = usePhone();
const adress = useAdress();
</script>
<style lang="">
</style>