<script setup>
const menu = useMenu()
const openMenu = () => {
  menu.value = !menu.value
}
</script>
<template>
  <header class="hdr">
    <div class="container">
      <div class="row">
        <div class="col-10 col-md-3 hdr__logo">
          <a href="/"
            ><img src="@/assets/img/AvalonLogoGold.svg" alt="AvalonLogoGold"
          /></a>
        </div>
        <div class="col-md-3 d-none d-md-block">
          <div class="hdr__adrs">
            <p class="header-contact-title">Главный офис</p>
            <p class="adr-cntnt flx-algn">
              <img src="@/assets/img/location-icon.svg" alt="" />
              Волоколамское ш., д. 73
            </p>
          </div>
        </div>
        <div class="col-md-2 d-none d-md-block">
          <div class="hdr__adrs">
            <p class="header-contact-title">Торговая площадка</p>
            <p class="adr-cntnt flx-algn">
              <img src="@/assets/img/location-icon.svg" alt="" />
              Летняя ул, д. 99
            </p>
          </div>
        </div>
        <div class="col-2 col-md-4">
          <div class="hdr__cntc">
            <div class="hdr__adrs">
              <a href="" class="adr-cntnt flx-algn">
                <img src="@/assets/img/phone-icon.svg" alt="" />8 925 220 47 28</a>
            </div>
            <a href="/club" class="btn hdr__cntc_btn">Вступить в клуб</a>
            <div class="menu-adpt-icon"
            :class="menu ? 'check' : ''"
            @click="openMenu">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <nav class="col-12 headr">
          <ul class="hdr__link"
            :class="menu ? 'nav-open' : ''"
          >
            <TheNav />
            <li class="adpt-items">
              <div class="hdr__adrs">
                <p class="adr-cntnt flx-algn">
                  <img src="@/assets/img/location-icon.svg" alt="" />ул Летняя 99</p>
                <a :href="`tel:`" class="adr-cntnt flx-algn"
                  ><img src="@/assets/img/phone-icon.svg" alt="" />8-925-220-47-28</a
                >
              </div>
              <a href="/club" class="btn hdr__cntc_btn">Вступить в клуб</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>


<style lang="scss">
.hdr__adrs {
  margin-bottom: 15px;
}
.header-contact-title {
  font-size: 16px;
  font-weight: 400;
}
</style>