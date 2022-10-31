<script setup>
const mail = useMail()
const phone = usePhone()
const adress = useAdress()
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
        <div class="col-2 col-md-9">
          <div class="hdr__cntc">
            <div class="hdr__adrs">
              <p class="adr-cntnt flx-algn">
                <img src="@/assets/img/location-icon.svg" alt="" />{{adress}}
              </p>
              <a href="" class="adr-cntnt flx-algn"
                ><img src="@/assets/img/phone-icon.svg" alt="" />{{phone}}</a>
            </div>
            <a href="/club" class="btn hdr__cntc_btn">Вступить в клуб</a>
            <div class="menu-adpt-icon">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <nav class="col-12 headr">
          <ul class="hdr__link">
            <TheNav/>
            <li class="adpt-items">
              <div class="hdr__adrs">
                <p class="adr-cntnt flx-algn">
                  <img src="@/assets/img/location-icon.svg" alt="" />{{adress}}
                </p>
                <a :href="`tel:${phone}`" class="adr-cntnt flx-algn"
                  ><img src="@/assets/img/phone-icon.svg" alt="" />{{phone}}</a
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
.hdr__adrs{
  margin-bottom: 15px;
}
</style>