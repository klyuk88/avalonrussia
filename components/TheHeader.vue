<script setup>
const menu = useMenu();
const openMenu = () => {
  menu.value = !menu.value;
};
const contacts = await useContacts()
</script>
<template>
  <header class="hdr">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-10 col-md-3 hdr__logo">
          <a href="/"
            ><img src="@/assets/img/AvalonLogoGold.svg" alt="AvalonLogoGold"
          /></a>
        </div>
        <div class="col-3 d-none d-xl-block">
          <div class="hdr__adrs">
            <p class="header-contact-title">Главный офис</p>
            <p class="adr-cntnt flx-algn">
              <img src="@/assets/img/location-icon.svg" alt="" />
              {{contacts.adressOffice}}
            </p>
          </div>
        </div>
        <div class="col-2 d-none d-xl-block">
          <div class="hdr__adrs">
            <p class="header-contact-title">Торговая площадка</p>
            <p class="adr-cntnt flx-algn">
              <img src="@/assets/img/location-icon.svg" alt="" />
              {{contacts.adressSelling}}
            </p>
          </div>
        </div>
        <div class="col-2 col-md-9 col-xl-4">
          <div class="hdr__cntc">
            <div class="hdr__adrs">
              <a href="" class="adr-cntnt flx-algn">
                <img src="@/assets/img/phone-icon.svg" alt="" />{{contacts.phoneOffice}}</a>
              <a href="" class="adr-cntnt flx-algn">
                <img src="@/assets/img/phone-icon.svg" alt="" />{{contacts.phoneSelling}}</a>
            </div>
            <a href="/club" class="btn hdr__cntc_btn">Вступить в клуб</a>
            <div class="menu btn2" data-menu="2">
              <div class="icon"></div>
            </div>
            <div
              class="menu-adpt-icon"
              :class="menu ? 'check' : ''"
              @click="openMenu"
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <nav class="col-12 headr">
          <ul class="hdr__link" :class="menu ? 'nav-open' : ''">
            <TheNav />
            <li class="adpt-items">
              <div class="hdr__adrs">
                <p class="adr-cntnt flx-algn">
                  <img src="@/assets/img/location-icon.svg" alt="" />ул Летняя
                  99
                </p>
                <a :href="`tel:`" class="adr-cntnt flx-algn"
                  ><img
                    src="@/assets/img/phone-icon.svg"
                    alt=""
                  />8-925-220-47-28</a
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
  @media (max-width: 990px) {
    display: none;
  }
}
.header-contact-title {
  font-size: 16px;
  font-weight: 400;
}
.hdr__cntc {
  gap: 30px;
  a.hdr__cntc_btn {
    background: #c2a06e;
    padding: 0;
    margin-left: 0;
    height: 40px;
    padding: 0 15px 0 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    @media (max-width: 990px) {
      display: none;
    }
  }
}
.hdr__link.nav-open {
  flex-direction: column;
  align-items: center;
}
.adpt-items {
  .hdr__adrs {
    @media (max-width: 990px) {
      display: block;
    }
  }
}
.btn.hdr__cntc_btn {
  display: none;
}
</style>