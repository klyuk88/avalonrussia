<script setup>
// Import Swiper Vue.js components
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const runtimeConfig = useRuntimeConfig();

const { data: models, error: errorModels } = await useFetch(
  runtimeConfig.apiURL +
    "/api/models?populate[thumbnail][fields][0]=url&populate=boats"
);
if (!errorModels.value) {
  models.value = models.value.data.filter(
    (item) => item.attributes.boats.data.length > 0
  );
}

const { error: errorMainPage, data: mainPage } = await useFetch(
  runtimeConfig.apiURL +
    "/api/main-page?populate[banner][fields][0]=url&populate=seo"
);

const seo = ref(null);
if (!errorMainPage.value) {
  seo.value = mainPage.value.data.attributes.seo;
}

const { error: errorNews, data: news } = await useFetch(
  runtimeConfig.apiURL +
    "/api/news?populate[thumbnail][fields][0]=url&pagination[page]=1&pagination[pageSize]=4"
);
</script>



<template>
  <div class="">
    <Head v-if="seo">
      <Title>{{ seo.metaTitle }}</Title>
      <Meta
        name="description"
        :content="seo.metaDescription"
        v-if="seo.metaDescription"
      />
      <Meta name="keywords" :content="seo.keywords" v-if="seo.keywords"></Meta>
    </Head>
    <section class="frst-scrn">
      <img
        src="@/assets/img/avalon_bacground.png"
        alt=""
        class="frst-scrn-bg"
      />
      <div class="container">
        <div class="row">
          <div class="col-12 frst-scrn__title">
            <h1 class="animate">Premium-class №1</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="models">
      <div class="container">
        <div class="models-slider" v-if="!errorModels">
          <Swiper
            :slides-per-view="4"
            :space-between="30"
            :modules="[Navigation]"
            :breakpoints="{
              320: {
                slidesPerView: 1,
                navigation: false,
              },
              960: {
                slidesPerView: 4,
                navigation: {
                  nextEl: '.next-arrow',
                  prevEl: '.prev-arrow',
                },
              },
            }"
          >
            <SwiperSlide v-for="(item, index) in models" :key="index">
              <div class="col-lg-3 swiper-slide models__cntr">
                <a :href="`/catalog?model=${item.attributes.slug}`">
                  <h3>{{ item.attributes.title }}</h3>
                  <img
                    :src="
                      $config.public.apiURL +
                      item.attributes.thumbnail.data.attributes.url
                    "
                    alt="WAKETOON"
                  />
                </a>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="prev-arrow">
            <img src="@/assets/img/ind-right.svg" alt="" />
          </div>
          <div class="next-arrow">
            <img src="@/assets/img/ind-left.svg" alt="" />
          </div>
        </div>

        <!-- Fake data  -->
        <div class="row models-slider" v-else>
          <Swiper
            :slides-per-view="4"
            :space-between="30"
            :modules="[Navigation]"
            :navigation="{
              nextEl: '.next-arrow',
              prevEl: '.prev-arrow',
            }"
          >
            <SwiperSlide v-for="(item, index) in 5" :key="index">
              <div class="col-lg-3 swiper-slide models__cntr">
                <a href="#">
                  <h3>Wakaton</h3>
                  <img src="@/assets/img/yaht-01.png" alt="WAKETOON" />
                </a>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="prev-arrow">
            <img src="@/assets/img/ind-right.svg" alt="" />
          </div>
          <div class="next-arrow">
            <img src="@/assets/img/ind-left.svg" alt="" />
          </div>
        </div>
      </div>
    </section>

    <section class="offer">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="offer__cntnt">
              <a class="offer__image">
                <img
                  v-if="mainPage.data.attributes.banner.data && !errorMainPage"
                  :src="
                    $config.public.apiURL +
                    mainPage.data.attributes.banner.data.attributes.url
                  "
                  alt="Offer boat"
                />
                <img src="@/assets/img/Cont-01.png" alt="Offer boat" v-else />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="news">
      <div class="container">
        <div class="row">
          <div class="col-12 avalon-title">
            <h2>Пресса</h2>
          </div>

          <div class="row" v-if="!errorNews">
            <div
              class="col-lg-6 line"
              v-for="(item, index) in news.data"
              :key="index"
            >
              <a :href="'/press/' + item.attributes.slug" class="news__content">
                <div class="news__title">
                  <h3>{{ item.attributes.title }}</h3>
                  <span>{{
                    new Date(item.attributes.publishedAt).toLocaleDateString()
                  }}</span>
                </div>
                <div class="news__text">
                  <p>
                    {{ item.attributes.previewtext }}
                  </p>
                  <div class="news__arrow">
                    <img src="@/assets/img/arrow.svg" alt="arrow" />
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div class="row" v-else>
            <div class="col-lg-6 line" v-for="(item, index) in 4" :key="index">
              <a class="news__content">
                <div class="news__title">
                  <h3>Lorem ipsum dolor sit amet</h3>
                  <span>20.10.2022</span>
                </div>
                <div class="news__text">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore
                  </p>
                  <div class="news__arrow">
                    <img src="@/assets/img/arrow.svg" alt="arrow" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss">
.frst-scrn {
  position: relative;
  width: 100%;
  height: 400px;
  h1 {
    position: relative;
    top: 300px;
  }
  .frst-scrn-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    object-fit: cover;
  }
}
.models-slider {
  position: relative;
  .prev-arrow {
    position: absolute;
    left: -80px;
    top: 50%;
    z-index: 100;
    cursor: pointer;
    display: none;
    @media (min-width: 960px) {
      display: block;
    }
  }
  .next-arrow {
    position: absolute;
    right: -80px;
    top: 50%;
    z-index: 100;
    cursor: pointer;
    display: none;
    @media (min-width: 960px) {
      display: block;
    }
  }
  .swiper {
    height: auto;
  }
}
.frst-scrn h1 {
  font-family: "Jura";
  font-weight: 600;
  font-size: 45px;
  color: #c2a06e;
  @media (max-width: 576px) {
    font-size: 30px;
  }
}
.swiper-button-prev:after,
.swiper-button-next:after {
  content: "";
}
.news__text {
  position: relative;
  .news__arrow {
    position: absolute;
    right: 0;
    bottom: 0;
  }
}

.news__text .news-preview-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>