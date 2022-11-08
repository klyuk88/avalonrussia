<script setup>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import qs from "qs";

const runtimeConfig = useRuntimeConfig();

const route = useRoute();
const router = useRouter();

const widthArr = ref([]);
const lengthArr = ref([]);

//значения из фильтра
const selectLength = ref(null);
const selectWidth = ref("any");
const selectModel = ref("any");
const selectStock = ref(false);

//Параметры фильтра для запроса
const lengthParam = ref("");
const widthParam = ref("");
const modelsParam = ref("");
const stockParam = ref("");

const pageLimit = ref(12);

//Получаем лодки
const {
  refresh: refresh,
  error: errorBoats,
  data: boats,
} = await useFetch(
  () =>
    `/api/boats?${lengthParam.value}${widthParam.value}${modelsParam.value}${stockParam.value}populate[thumbnail][fields][0]=url&pagination[start]=0&pagination[limit]=${pageLimit.value}`,
  {
    baseURL: runtimeConfig.apiURL,
  }
);

// Получаем параметры для фильтра
const { error: paramsError, data: paramsData } = await useFetch(`/api/types`, {
  baseURL: runtimeConfig.apiURL,
});

if (!paramsError.value) {
  paramsData.value.data.forEach((item) => {
    for (let prop in item.attributes) {
      if (item.attributes.hasOwnProperty(prop)) {
        prop === "length" ? lengthArr.value.push(item.attributes[prop]) : null;
        prop === "width" ? widthArr.value.push(item.attributes[prop]) : null;
      }
    }
  });
  lengthArr.value = [...new Set(lengthArr.value)];
  widthArr.value = [...new Set(widthArr.value)];

  console.log();
}

//Модели + автофильтр по модели при перезагрзке стр
const { error: errorModels, data: models } = await useFetch(
  runtimeConfig.apiURL + "/api/models?populate=boats"
);
if (!errorModels.value) {
  models.value = models.value.data.filter(
    (item) => item.attributes.boats.data.length > 0
  );

  models.value.forEach((item) => {
    if (item.attributes.slug === route.query.model) {
      selectModel.value = route.query.model;
      modelsParam.value = `filters[model][slug][$eq]=${selectModel.value}&`;
      refresh();
    }
  });
}

//пооучаем фильтрованные лодки
const showFilterBoats = async () => {
  router.replace({ query: {} });
  if (selectLength.value) {
    lengthParam.value = `filters[types][length][$eq]=${selectLength.value}&`;
  } else {
    lengthParam.value = "";
  }
  if (selectWidth.value && selectWidth.value !== "any") {
    widthParam.value = `filters[types][width][$eq]=${selectWidth.value}&`;
  } else {
    widthParam.value = "";
  }
  if (selectModel.value && selectModel.value !== "any") {
    modelsParam.value = `filters[model][slug][$eq]=${selectModel.value}&`;
    router.push({
      query: {
        model: selectModel.value,
      },
    });
  } else {
    modelsParam.value = "";
    router.replace({ query: {} });
  }

  if (selectStock.value) {
    stockParam.value = `filters[instock][$eq]=${selectStock.value}&`;
  } else {
    stockParam.value = "";
  }
  await refresh();
};

const nextPage = async () => {
  pageLimit.value = pageLimit.value + 12;
  await refresh();
};

//СЕО теги
const seo = ref(null);
const { error: catalogPageError, data: catalogPageData } = await useFetch(
  `/api/catalog-page?populate=seo`,
  { baseURL: runtimeConfig.apiURL }
);
if (!catalogPageError.value) {
  seo.value = catalogPageData.value.data.attributes.seo;
}
</script>

<template>
  <section class="text-sectn animate catalog">
    <Head v-if="seo">
      <Title>{{ seo.metaTitle }}</Title>
      <Meta
        name="description"
        :content="seo.metaDescription"
        v-if="seo.metaDescription"
      />
      <Meta name="keywords" :content="seo.keywords" v-if="seo.keywords"></Meta>
    </Head>

    <div class="container">
      <div class="row" v-if="!errorBoats">
        <div class="col-12 avalon-title">
          <h2>Каталог катеров</h2>
          <div class="line-ttl"></div>
          <h4 class="find-models-count">
            Найдено моделей {{ boats.meta.pagination.total }}
          </h4>
        </div>
        <div class="col-lg-4 filter">
          <div class="sticky">
            <h6>Длина (м)</h6>
            <vSelect
              :options="lengthArr"
              :filterable="false"
              :placeholder="'Выбрать длину'"
              :searchable="false"
              v-model="selectLength"
            ></vSelect>

            <h6>Ширина (м)</h6>
            <div class="filter__button">
              <span class="filter-width-item any">
                <input
                  type="radio"
                  v-model="selectWidth"
                  value="any"
                  id="any"
                />
                <label for="any">Любая</label>
              </span>
              <span
                class="filter-width-item"
                v-for="(item, index) in widthArr"
                :key="index"
              >
                <input
                  type="radio"
                  :id="index"
                  :value="item"
                  v-model="selectWidth"
                />
                <label :for="index"> {{ item }} </label>
              </span>
            </div>

            <h6>Модели</h6>
            <div class="filter__models" v-if="!errorModels">
              <div class="model-checkbox">
                <input
                  type="radio"
                  id="anyModel"
                  value="any"
                  v-model="selectModel"
                />
                <label for="anyModel">Любая</label>
              </div>
              <div
                class="model-checkbox"
                v-for="(item, index) in models"
                :key="index"
              >
                <input
                  type="radio"
                  :id="item.attributes.slug"
                  :value="item.attributes.slug"
                  v-model="selectModel"
                />
                <label :for="item.attributes.slug">{{
                  item.attributes.title
                }}</label>
              </div>
            </div>

            <h6>Наличие</h6>
            <div class="inStock">
              <input type="checkbox" name="" id="stock" v-model="selectStock" />
              <label for="stock"><span>В наличии</span></label>
            </div>

            <a
              href="#"
              class="btn text-btn filter-btn"
              @click.prevent="showFilterBoats"
              >Показать</a
            >
          </div>
        </div>
        <div class="col-lg-8 ctlg-cont">
          <div class="row" v-if="boats.data.length > 0">
            <div
              class="col-md-6"
              v-for="(item, index) in boats.data"
              :key="index"
            >
              <a :href="'/catalog/' + item.attributes.slug">
                <div class="ctlg-cont__block">
                  <div class="ctlg-cont__block-title">
                    <h3>{{ item.attributes.title }}</h3>
                    <img src="@/assets/img/arrow.svg" alt="" />
                  </div>
                  <img
                    :src="
                      $config.public.apiURL +
                      item.attributes.thumbnail.data.attributes.url
                    "
                    alt=""
                  />
                </div>
              </a>
            </div>
            <a
              class="avln_link"
              @click.prevent="nextPage"
              v-if="pageLimit < boats.meta.pagination.total"
            >
              Показать больше <img src="@/assets/img/right-arrv.svg" alt="" />
            </a>
          </div>
          <div class="row" v-else>
            <h2>Нет подходящих моделей, соответсвующих выбранным парамтерам</h2>
          </div>
        </div>
      </div>
      <div class="row" v-else>
        <h1 style="margin-bottom: 30px">
          Упс...Кажется произошла ошибка загрузки данных, мы уже работаем над ее
          устранением.
        </h1>
        <img src="@/assets/img/image.png" alt="" />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.vs__dropdown-toggle {
  cursor: pointer;
  position: relative;
  height: 60px;
  border: 2px solid rgba(222, 202, 157, 0.15);
  width: 100%;
  margin-bottom: 40px;
  border-radius: 0;
  padding: 0 15px;
}
.vs__dropdown-toggle:hover {
  border: 2px solid #c2a06e;
  cursor: pointer;
}
.vs__open-indicator {
  fill: #fff;
}

.vs__dropdown-menu {
  border-radius: 0;
  background: #111;
  border: 2px solid rgba(222, 202, 157, 0.15);
  .vs__dropdown-option {
    background: #111;
    color: #fff;
    padding: 15px 15px;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid rgba(222, 202, 157, 0.15);
  }
  .vs__dropdown-option:hover {
    background: #c2a06e;
  }
}

.vs__selected {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}
.vs__search::placeholder {
  font-size: 18px;
  font-weight: 600;
}

.filter__button span {
  position: relative;
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 101px;
    height: 60px;
    border: 2px solid rgba(222, 202, 157, 0.15);
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }
  label:hover {
    border: 2px solid rgba(222, 202, 157, 0.4);
    color: #c2a06e;
  }
  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    left: 0;
    z-index: -100;
  }
  input:checked + label {
    border: 2px solid #c2a06e;
    color: #c2a06e;
  }
}

.model-checkbox {
  position: relative;
  label {
    cursor: pointer;
    margin: 0 18px 20px 0;
    border: none;
    background: none;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: rgba(255, 255, 255, 0.5);
    transition: all 0.2s ease;
    display: block;
  }
  input {
    position: absolute;
    width: 0;
    height: 0;
    left: 0;
    opacity: 0;
  }
  label:hover {
    color: rgba(255, 255, 255, 0.7);
  }
  input:checked + label {
    color: #c2a06e;
    transform: scale(1.1);
  }
}

.btn.text-btn.filter-btn {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
.btn.text-btn.filter-btn:hover {
  background: #c2a06e;
  color: #111;
}

.vs__clear {
  fill: #c2a06e;
  opacity: 0.5;
}

.inStock {
  position: relative;
  display: flex;
  align-items: center;
  // input {
  //   position: absolute;
  //   left: 0;
  //   width: 0;
  //   height: 0;
  //   opacity: 0;
  // }
  input {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 30px;
    height: 30px;
    border: 3px solid #c2a06e;
    background: transparent;
    display: block;
    cursor: pointer;
    margin-right: 15px;
    transition: background 0.2s ease;
  }
  span {
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }
  input:checked {
    background: #c2a06e;
  }
}

.catalog {
  .line-ttl {
    margin: 0;
  }
  .find-models-count {
    text-align: right;
    margin: 30px 0;
  }
}


</style>

