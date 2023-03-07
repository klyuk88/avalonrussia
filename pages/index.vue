<script setup>
// Import Swiper Vue.js components
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref } from "vue";
import qs from "qs";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const runtimeConfig = useRuntimeConfig();

const noEmptyModels = ref([]);
const { data: models, error: errorModels } = await useFetch(
  `${runtimeConfig.apiURL}/api/models?populate[thumbnail][fields][0]=url&populate=boats`
);

if (!errorModels.value) {
  noEmptyModels.value = models.value.data.filter(
    (item) => item.attributes.boats.data.length > 0
  );
}

const query = qs.stringify({
  populate: ["banner", "seo"],
});

const { error: errorMainPage, data: mainPage } = await useFetch(
  runtimeConfig.apiURL + `/api/main-page?${query}`
);

const seo = ref(null);
if (!errorMainPage.value) {
  seo.value = mainPage.value.data.attributes.seo;
}

const { error: errorNews, data: news } = await useFetch(
  runtimeConfig.apiURL +
    "/api/news?populate[thumbnail][fields][0]=url&pagination[page]=1&pagination[pageSize]=4"
);
const slider = ref(null);

const onSwiper = (swiper) => {
  slider.value = swiper;
};
const nextSlide = () => {
  slider.value.slideNext();
};
const prevSlide = () => {
  slider.value.slidePrev();
};
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
            <h1 class="animate">Понтонные катера премиум класса</h1>
          </div>
        </div>
      </div>
    </section>
    <section class="models">
      <div class="container">
        <div class="models-slider" v-if="!errorModels">
          <client-only>
            <Swiper
              @swiper="onSwiper"
              :modules="[Pagination]"
              :slides-per-view="4"
              :space-between="30"
              :pagination="{ clickable: true }"
              :breakpoints="{
                320: {
                  slidesPerView: 1,
                },
                960: {
                  slidesPerView: 4,
                },
              }"
            >
              <SwiperSlide v-for="(item, index) in noEmptyModels" :key="index">
                <div class="col-lg-3 swiper-slide models__cntr">
                  <NuxtLink :to="`/catalog?model=${item.attributes.slug}`">
                    <h3>{{ item.attributes.title }}</h3>
                    <img
                      :src="
                        $config.public.apiURL +
                        item.attributes.thumbnail.data.attributes.url
                      "
                      alt="WAKETOON"
                    />
                  </NuxtLink>
                </div>
              </SwiperSlide>
            </Swiper>
          </client-only>

          <div class="prev-arrow">
            <img src="@/assets/img/ind-right.svg" alt="" @click="prevSlide" />
          </div>
          <div class="next-arrow" @click="nextSlide">
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
              <NuxtLink to="/service" class="offer__image">
                <img
                  v-if="mainPage.data.attributes.banner.data && !errorMainPage"
                  :src="
                    $config.public.apiURL +
                    mainPage.data.attributes.banner.data.attributes.url
                  "
                  alt="Offer boat"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      class="about pt-120"
      v-if="
        mainPage.data.attributes.aboutText !== null ||
        mainPage.data.attributes.aboutText !== ''
      "
    >
      <div class="container border-top-custom">
        <div class="col-12 avalon-title pt-100">
          <h2>О компании</h2>
        </div>
        <div

          v-html="mainPage.data.attributes.aboutText"
          class="text-white"
        ></div>
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
              <NuxtLink
                :to="'/press/' + item.attributes.slug"
                class="news__content"
              >
                <div class="news__title">
                  <h3>{{ item.attributes.title }}</h3>
                  <ClientOnly>
                    <span>{{
                      new Date(item.attributes.publishedAt).toLocaleDateString()
                    }}</span>
                  </ClientOnly>
                </div>
                <div class="news__text">
                  <p>
                    {{ item.attributes.previewtext }}
                  </p>
                  <div class="news__arrow">
                    <img src="@/assets/img/arrow.svg" alt="arrow" />
                  </div>
                </div>
              </NuxtLink>
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
  .swiper-pagination {
    display: none;

    @media screen and (max-width: 768px) {
      display: block;
    }
    .swiper-pagination-bullet.swiper-pagination-bullet-active {
      background: #c2a06e;
    }
  }
  .prev-arrow {
    position: absolute;
    left: -80px;
    top: 50%;
    z-index: 100;
    cursor: pointer;
    display: none;
    @media (min-width: 960px) {
      display: block;
      left: -50px;
    }
    @media (min-width: 1024px) {
      left: -80px;
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
      right: -50px;
    }
    @media (min-width: 1024px) {
      right: -80px;
    }
  }
  .swiper {
    height: auto;
  }
}
.frst-scrn h1 {
  // font-family: "Jura";
  font-weight: 600;
  font-size: 45px;
  line-height: 1.2;
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

.news {
  padding-bottom: 100px;
}

@media (max-width: 576px) {
  .offer__cntnt {
    overflow-x: hidden;
    img {
      width: 200% !important;
      position: relative;
      transform: translateX(-50%);
    }
  }
}
</style>