<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import { ref, onMounted } from "vue";
import "swiper/css";
import "swiper/css/navigation";
const runtimeConfig = useRuntimeConfig();
const tabContent = ref("");
const route = useRoute();
const {
  refresh,
  error,
  data: boatsData,
} = await useFetch(
  () => `/api/boats?filters[slug][$eq]=${route.params.slug}&populate=*`,
  { baseURL: runtimeConfig.apiURL }
);

const tabActive = (tab) => {
  if (tab === "bridge") {
    tabContent.value = boatsData.value.data[0].attributes.bridge;
  } else if (tab === "interior") {
    tabContent.value = boatsData.value.data[0].attributes.interior;
  } else if (tab === "exterior") {
    tabContent.value = boatsData.value.data[0].attributes.exterior;
  } else if (tab === "body") {
    tabContent.value = boatsData.value.data[0].attributes.body;
  }
};
const modal = useModal();
const openModal = () => {
  modal.value = true;
};

const paramIndex = ref(0);
const openParam = (index) => {
  paramIndex.value = index;
};

onMounted(async () => {
  await refresh();
  if (boatsData.value.data[0].attributes.bridge) {
    tabContent.value = boatsData.value.data[0].attributes.bridge;
  } else if (boatsData.value.data[0].attributes.interior) {
    tabContent.value = boatsData.value.data[0].attributes.interior;
  } else if (boatsData.value.data[0].attributes.exterior) {
    tabContent.value = boatsData.value.data[0].attributes.exterior;
  } else if (boatsData.value.data[0].attributes.body) {
    tabContent.value = boatsData.value.data[0].attributes.body;
  }
});
</script>

<template>
  <div v-if="!error">
    <Head v-if="boatsData.data[0].attributes.seo">
      <Title>{{ boatsData.data[0].attributes.seo.metaTitle }}</Title>
      <Meta
        name="description"
        :content="boatsData.data[0].attributes.seo.metaDescription"
        v-if="boatsData.data[0].attributes.seo.metaDescription"
      />
      <Meta
        name="keywords"
        :content="boatsData.data[0].attributes.seo.keywords"
        v-if="boatsData.data[0].attributes.keywords"
      ></Meta>
    </Head>
    <section class="slider-sectn animate">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <div
              class="product-slider"
              v-if="boatsData.data[0].attributes.gallery.data.length > 0"
            >
              <Swiper
                :modules="[Navigation]"
                :slides-per-view="1"
                :space-between="15"
                :navigation="{
                  nextEl: '.product-slider-nav.next',
                  prevEl: '.product-slider-nav.prev',
                }"
              >
                <SwiperSlide
                  v-for="(item, index) in boatsData.data[0].attributes.gallery.data"
                  :key="index"
                >
                  <div class="product-slider-item">
                    <img
                      :src="$config.public.apiURL + item.attributes.url"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
              <span
                class="product-slider-nav prev"
                v-if="boatsData.data[0].attributes.gallery.data.length > 1"
              >
                <img src="@/assets/img/ind-right.svg" alt="" />
              </span>
              <span
                class="product-slider-nav next"
                v-if="boatsData.data[0].attributes.gallery.data.length > 1"
              >
                <img src="@/assets/img/ind-left.svg" alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="text-sectn animate">
      <div class="container">
        <div class="row">
          <div class="col-12 avalon-title">
            <h2>{{ boatsData.data[0].attributes.title }}</h2>
            <div class="line-ttl"></div>
          </div>
          <div class="row">
            <div class="col-lg mt-4 mt-xl-0">
              <div
                class="single-product-content"
                v-html="boatsData.data[0].attributes.about"
              ></div>
              <div v-if="boatsData.data[0].attributes.schemaImages">
                <img
                  :src="$config.public.apiURL + item.attributes.url"
                  :alt="item.attributes.alternativeText"
                  class="single-product-schema-image"
                  v-for="(item, index) in boatsData.data[0].attributes
                    .schemaImages.data"
                  :key="index"
                />
              </div>

              <div class="col-12 text__btn-sect">
                <a class="btn text__btn" @click.prevent="openModal"
                  >Узнать стоиомсть</a
                >
              </div>
            </div>
            <div
              class="col-lg order-first order-xl-last"
              v-if="boatsData.data[0].attributes.model.data.attributes.videoId"
            >
              <div class="video-block">
                <iframe
                  width="100%"
                  style="aspect-ratio: 16/9"
                  :src="`https://www.youtube-nocookie.com/embed/${boatsData.data[0].attributes.model.data.attributes.videoId}?controls=0`"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="prmtr-sect pb-100">
      <div class="container">
        <div class="row">
          <div class="col-12 prmtr-sect__title">
            <h3>Параметры и комплектация</h3>
            <div class="line-ttl"></div>
          </div>
          <div class="col-xl-6 prmtr-sect__prmtr">
            <div class="single-product-tabs">
              <div
                class="single-product-tabs-item"
                :class="{
                  active: tabContent === boatsData.data[0].attributes.bridge,
                }"
                @click="tabActive('bridge')"
                v-if="boatsData.data[0].attributes.bridge"
              >
                Капитанский мостик
              </div>

              <div
                class="single-product-tabs-item"
                :class="{
                  active: tabContent === boatsData.data[0].attributes.interior,
                }"
                v-if="boatsData.data[0].attributes.interior"
                @click="tabActive('interior')"
              >
                Интерьер
              </div>

              <div
                class="single-product-tabs-item"
                :class="{
                  active: tabContent === boatsData.data[0].attributes.exterior,
                }"
                v-if="boatsData.data[0].attributes.exterior"
                @click="tabActive('exterior')"
              >
                Экстерьер
              </div>

              <div
                class="single-product-tabs-item"
                :class="{
                  active: tabContent === boatsData.data[0].attributes.body,
                }"
                v-if="boatsData.data[0].attributes.body"
                @click="tabActive('body')"
              >
                Корпус
              </div>
            </div>

            <div class="single-product-tab-content">
              <div v-html="tabContent"></div>
            </div>
          </div>

          <div class="col-xl-5 offset-xl-1 mt-4 mt-xl-0 prmtr-sect__abaut">
            <div
              class="abaut-acrd"
              :class="paramIndex === index ? 'active' : ''"
              v-for="(item, index) in boatsData.data[0].attributes.types.data"
              :key="index"
              @click="openParam(index)"
            >
              <div class="abaut-acrd__title">
                <p>
                  {{ item.attributes.title }}
                </p>
                <img
                  src="@/assets/img/more.svg"
                  alt=""
                  class="close-tab-icon"
                  :class="paramIndex === index ? 'active' : ''"
                />
              </div>
              <div class="abaut-acrd__contnt">
                <ul class="single-product-tab-content">
                  <li class="prmtr">
                    <div><p>Длина корпуса</p></div>
                    <div>
                      <span>{{ item.attributes.length }} м</span>
                    </div>
                  </li>
                  <li class="prmtr">
                    <div><p>Ширина корпуса</p></div>
                    <div>
                      <span>{{ item.attributes.width }} м</span>
                    </div>
                  </li>
                  <li class="prmtr">
                    <div><p>Кол-во пассажиров</p></div>
                    <div>
                      <span>{{ item.attributes.passagers }}</span>
                    </div>
                  </li>
                  <li class="prmtr">
                    <div><p>Сухой вес</p></div>
                    <div>
                      <span>{{ item.attributes.weight }} кг</span>
                    </div>
                  </li>
                  <li class="prmtr">
                    <div><p>Мощность двигателя</p></div>
                    <div>
                      <span>{{ item.attributes.power }} л/с</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else>
    <div class="container error-info">
      <div class="row">
        <div class="col-12">
          <h2>
            Возникла ошибка загрузки данных, приносим свои извинения, мы уже
            работаем над её исправлением...
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.product-slider {
  .swiper {
    height: auto;
  }
  .product-slider-item {
    width: 100%;
    position: relative;
    aspect-ratio: 16/9;
    @media (min-width: 1200px) {
      height: 80vh;
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  }
}
.product-slider {
  position: relative;
  .product-slider-nav {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    img {
      width: 22px;
    }
  }
  .product-slider-nav.prev {
    left: 100px;
    display: none;
    @media (min-width: 1200px) {
      display: flex;
    }
  }
  .product-slider-nav.next {
    right: 100px;
    display: none;
    @media (min-width: 1200px) {
      display: flex;
    }
  }
}
.container.error-info {
  h2 {
    padding: 30px 0;
  }
  img {
    width: 100%;
  }
}
.single-product-video {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  .video-cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .video-play-btn {
    width: 110px;
    height: 110px;
    cursor: pointer;
    z-index: 99;
  }
}
.single-product-tabs {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  position: relative;
  @media (max-width: 760px) {
    flex-direction: column;
  }
  .single-product-tabs-item {
    border: 2px solid #c2a06e;
    background: transparent;
    padding: 10px 15px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-left: -2px;
    cursor: pointer;
    @media (max-width: 760px) {
      width: 100%;
    }
  }
  .single-product-tabs-item.active {
    background: #c2a06e;
    color: #fff;
  }
  .tabs-title {
    position: absolute;
    left: -50px;
    transform: rotate(-90deg);
  }
}
.abaut-acrd__contnt {
  padding: 30px 0;
  border-top: 2px solid #c2a06e;
}

.video-block {
  margin-top: 30px;
  @media (min-width: 960px) {
    margin-top: 0;
  }
}

.btn.text__btn {
  height: 50px;
  width: 70%;
  @media (min-width: 960px) {
    width: 257px;
    height: 80px;
  }
}

.single-product-content img {
  width: 100%;
}

table.iksweb {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  height: auto;
}
table.iksweb,
table.iksweb td,
table.iksweb th {
  border: 2px solid #373737;
}
table.iksweb td {
  color: #c2a06e;
  font-weight: 500;
}
table.iksweb td,
table.iksweb th {
  min-height: 35px;
  padding: 10px;
  width: 30px;
  height: 35px;
}
table.iksweb th {
  color: #fff;
  font-weight: 600;
  // background: #c2a06e;
}
.close-tab-icon {
  transition: transform 0.2s ease;
}
.close-tab-icon.active {
  transform: rotate(-45deg);
}

.single-product-schema-image {
  width: 50%;
  @media screen and (max-width: 576px) {
    width: 100%;
  }
}
</style>